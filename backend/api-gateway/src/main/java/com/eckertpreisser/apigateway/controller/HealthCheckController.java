package com.eckertpreisser.apigateway.controller;

import com.eckertpreisser.common.utils.LoggerUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

/**
 * Health Check Controller
 *
 * Aggregates health status from all microservices
 * Provides a single endpoint for frontend to check all services
 *
 * CRITICAL: Uses LoggerUtil with error codes
 */
@RestController
@RequestMapping("/api/health")
@CrossOrigin(origins = "*")
public class HealthCheckController {

    private static final Logger logger = LoggerFactory.getLogger(HealthCheckController.class);
    private final WebClient webClient;

    public HealthCheckController() {
        this.webClient = WebClient.builder().build();
    }

    /**
     * Get health status of all services
     *
     * @return Map with service health information
     */
    @GetMapping("/services")
    public Mono<ResponseEntity<Map<String, Object>>> getServicesHealth() {
        LoggerUtil.info(logger, "HEALTH_001", "Checking health of all 6 services");

        // Check all services in parallel (reactive, non-blocking)
        Mono<Map<String, Object>> eurekaCheck = checkService("http://service-discovery:8761/actuator/health", 8761, "3.2.0");
        Mono<Map<String, Object>> configCheck = checkService("http://config-server:8888/actuator/health", 8888, "3.2.0");
        Mono<Map<String, Object>> userCheck = checkService("http://user-service:8081/actuator/health", 8081, "3.2.0");
        Mono<Map<String, Object>> authCheck = checkService("http://auth-service:8082/actuator/health", 8082, "3.2.0");
        Mono<Map<String, Object>> emailCheck = checkService("http://email-service:8084/actuator/health", 8084, "3.2.0");

        // Combine all health checks
        return Mono.zip(eurekaCheck, configCheck, userCheck, authCheck, emailCheck)
            .map(tuple -> {
                Map<String, Object> response = new HashMap<>();
                Map<String, Object> services = new HashMap<>();

                // Add all checked services
                services.put("eureka", tuple.getT1());
                services.put("config", tuple.getT2());
                services.put("user", tuple.getT3());
                services.put("auth", tuple.getT4());
                services.put("email", tuple.getT5());

                // API Gateway (self) is always UP
                Map<String, Object> gateway = new HashMap<>();
                gateway.put("status", "UP");
                gateway.put("port", 8080);
                gateway.put("version", "3.2.0");
                services.put("gateway", gateway);

                response.put("services", services);

                // Calculate overall status
                long upCount = services.values().stream()
                    .filter(s -> s instanceof Map && "UP".equals(((Map<?, ?>) s).get("status")))
                    .count();

                if (upCount == services.size()) {
                    response.put("overallStatus", "operational");
                } else if (upCount > 0) {
                    response.put("overallStatus", "degraded");
                } else {
                    response.put("overallStatus", "down");
                }

                response.put("frontend", Map.of(
                    "version", "2.16.0",
                    "status", "UP"
                ));

                LoggerUtil.info(logger, "HEALTH_002", "Health check complete - 6 services",
                    Map.of("total", services.size(), "upCount", upCount));

                return ResponseEntity.ok(response);
            })
            .onErrorResume(e -> {
                LoggerUtil.error(logger, "HEALTH_ERR_001", "Failed to check services health", e);
                return Mono.just(ResponseEntity.internalServerError().<Map<String, Object>>build());
            });
    }

    /**
     * Check health of a single service (reactive, non-blocking)
     */
    private Mono<Map<String, Object>> checkService(String url, int port, String version) {
        return webClient.get()
            .uri(url)
            .retrieve()
            .bodyToMono(String.class)
            .timeout(java.time.Duration.ofSeconds(5))
            .map(response -> {
                Map<String, Object> result = new HashMap<>();
                result.put("port", port);
                result.put("version", version);

                // Check if response contains status UP
                if (response != null && (response.contains("\"status\":\"UP\"") || response.contains("\"status\""))) {
                    result.put("status", "UP");
                    LoggerUtil.info(logger, "HEALTH_003", "Service is UP",
                        Map.of("url", url, "port", port));
                } else {
                    result.put("status", "DOWN");
                    LoggerUtil.warn(logger, "HEALTH_WARN_002", "Service reports DOWN",
                        Map.of("url", url, "port", port));
                }

                return result;
            })
            .onErrorResume(e -> {
                Map<String, Object> result = new HashMap<>();
                result.put("port", port);
                result.put("version", version);
                result.put("status", "DOWN");

                LoggerUtil.warn(logger, "HEALTH_WARN_001", "Service unreachable",
                    Map.of("url", url, "port", port, "error", e.getMessage()));

                return Mono.just(result);
            });
    }
}
