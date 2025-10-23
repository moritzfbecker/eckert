/**
 * Status Page
 *
 * Real-time monitoring dashboard for all microservices
 * Shows health status, version, uptime for each service
 *
 * IMPORTANT: Hardcoded English for admin purposes
 * This page MUST work even when backend is down
 * No i18n dependencies - always accessible
 */

import { Container } from '../../../shared/ui-components/Container'
import { useState, useEffect } from 'react'
import { logger } from '@eckert-preisser/shared/utils'

interface ServiceStatus {
  name: string
  url: string
  port: number
  status: 'UP' | 'DOWN' | 'UNKNOWN'
  version?: string
  uptime?: string
}

const Status = () => {
  const [services, setServices] = useState<ServiceStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [lastCheck, setLastCheck] = useState<Date>(new Date())

  const checkServices = async () => {
    logger.info('STATUS_001', 'Checking service health via API Gateway')
    setLoading(true)

    // Default service list (always shown, even if backend is down)
    const defaultServices: ServiceStatus[] = [
      // Infrastructure Services
      { name: 'Service Discovery (Eureka)', url: '', port: 8761, status: 'UNKNOWN', version: '3.1.0' },
      { name: 'Config Server', url: '', port: 8888, status: 'UNKNOWN', version: '3.1.0' },
      { name: 'API Gateway', url: '', port: 8080, status: 'UNKNOWN', version: '3.1.0' },
      // Business Services
      { name: 'User Service (PostgreSQL)', url: '', port: 8081, status: 'UNKNOWN', version: '3.1.0' },
      { name: 'Auth Service (JWT)', url: '', port: 8082, status: 'UNKNOWN', version: '3.1.0' },
      { name: 'Email Service (SMTP)', url: '', port: 8084, status: 'UNKNOWN', version: '3.1.0' },
      // Frontend
      { name: 'Frontend (Shell)', url: '', port: 3000, status: 'UP', version: '2.12.1' },
    ]

    try {
      // Get base path (for subpath deployments like /development)
      const basePath = import.meta.env.BASE_URL || '/'
      const apiPath = basePath === '/' ? '/api/health/services' : `${basePath}api/health/services`

      // Call API Gateway health endpoint
      const response = await fetch(apiPath, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      })

      if (response.ok) {
        const data = await response.json()

        // Update services with real data from backend
        const updatedServices = defaultServices.map(service => {
          if (service.name.includes('Eureka') && data.services?.eureka) {
            return { ...service, status: data.services.eureka.status, version: data.services.eureka.version }
          }
          if (service.name.includes('Config') && data.services?.config) {
            return { ...service, status: data.services.config.status, version: data.services.config.version }
          }
          if (service.name.includes('Gateway') && data.services?.gateway) {
            return { ...service, status: data.services.gateway.status, version: data.services.gateway.version }
          }
          if (service.name.includes('User Service') && data.services?.user) {
            return { ...service, status: data.services.user.status, version: data.services.user.version }
          }
          if (service.name.includes('Auth Service') && data.services?.auth) {
            return { ...service, status: data.services.auth.status, version: data.services.auth.version }
          }
          if (service.name.includes('Email Service') && data.services?.email) {
            return { ...service, status: data.services.email.status, version: data.services.email.version }
          }
          if (service.name.includes('Frontend') && data.frontend) {
            return { ...service, status: data.frontend.status, version: data.frontend.version }
          }
          return service
        })

        setServices(updatedServices)
        setLastCheck(new Date())
        logger.info('STATUS_002', 'Service health check complete', {
          total: updatedServices.length,
          up: updatedServices.filter(s => s.status === 'UP').length
        })
      } else {
        // Backend not reachable - show default list as DOWN
        setServices(defaultServices.map(s =>
          s.name.includes('Frontend') ? s : { ...s, status: 'DOWN' }
        ))
        logger.error('STATUS_ERR_001', 'Failed to fetch service health')
      }
    } catch (error) {
      // Backend not reachable - show default list as DOWN
      setServices(defaultServices.map(s =>
        s.name.includes('Frontend') ? s : { ...s, status: 'DOWN' }
      ))
      logger.error('STATUS_ERR_001', 'Health check failed', error as Error)
    }

    setLoading(false)
  }

  useEffect(() => {
    // Only run once on mount
    checkServices()
    const interval = setInterval(checkServices, 30000) // Refresh every 30s
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency - only run once

  const backendServices = services.slice(0, 6) // First 6 are backend
  const frontendServices = services.slice(6)  // Last is frontend

  const healthyCount = services.filter(s => s.status === 'UP').length
  const overallStatus = healthyCount === services.length ? 'operational'
    : healthyCount > 0 ? 'degraded'
    : 'down'

  return (
    <div className="pt-32 pb-20 bg-eckert-white">
      <Container>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-black mb-4 text-black">System Status Dashboard</h1>
          <p className="text-black/60 mb-12">Real-time monitoring of all microservices and modules</p>

          {/* Overall Status */}
          <div className={`
            p-6 rounded-lg border-2 mb-12
            ${overallStatus === 'operational' ? 'bg-green-50 border-green-500' : ''}
            ${overallStatus === 'degraded' ? 'bg-yellow-50 border-yellow-500' : ''}
            ${overallStatus === 'down' ? 'bg-red-50 border-red-500' : ''}
          `}>
            <h2 className="text-2xl font-bold mb-2 text-black">Overall Status</h2>
            <p className={`text-lg font-semibold
              ${overallStatus === 'operational' ? 'text-green-700' : ''}
              ${overallStatus === 'degraded' ? 'text-yellow-700' : ''}
              ${overallStatus === 'down' ? 'text-red-700' : ''}
            `}>
              {overallStatus === 'operational' && 'All Systems Operational'}
              {overallStatus === 'degraded' && 'Degraded Performance'}
              {overallStatus === 'down' && 'System Outage'}
            </p>
            <div className="flex gap-6 mt-4 text-sm">
              <p className="text-black/60">
                {healthyCount} / {services.length} Online
              </p>
              <p className="text-black/60">
                Backend v3.1.0 | Frontend v2.12.1
              </p>
            </div>
          </div>

          {/* Backend Services */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-black">Backend Services</h2>
              <button
                onClick={checkServices}
                disabled={loading}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50"
              >
                Refresh
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {backendServices.map((service, index) => (
                <div
                  key={`${service.name}-${service.port}-${index}`}
                  className="bg-white border border-black/10 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-black">{service.name}</h3>
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-semibold
                      ${service.status === 'UP' ? 'bg-green-100 text-green-800' : ''}
                      ${service.status === 'DOWN' ? 'bg-red-100 text-red-800' : ''}
                      ${service.status === 'UNKNOWN' ? 'bg-gray-100 text-gray-800' : ''}
                    `}>
                      {service.status === 'UP' && 'Online'}
                      {service.status === 'DOWN' && 'Offline'}
                      {service.status === 'UNKNOWN' && 'Unknown'}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-black/70">
                    <p>
                      <span className="font-semibold text-black">Port:</span> {service.port}
                    </p>
                    {service.version && (
                      <p>
                        <span className="font-semibold text-black">Version:</span> {service.version}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Frontend Modules */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">Frontend Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {frontendServices.map((service, index) => (
                <div
                  key={`frontend-${service.name}-${index}`}
                  className="bg-white border border-black/10 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-black">{service.name}</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      Online
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-black/70">
                    <p>
                      <span className="font-semibold text-black">Port:</span> {service.port}
                    </p>
                    <p>
                      <span className="font-semibold text-black">Version:</span> {service.version}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Last Check */}
          <div className="text-center text-black/60 text-sm">
            Last Check: {lastCheck.toLocaleTimeString('de-DE')}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Status
