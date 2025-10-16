/**
 * Status Page
 *
 * Real-time monitoring dashboard for all microservices
 * Shows health status, version, uptime for each service
 * CRITICAL: ALL text uses i18n system (DE/EN)
 */

import { Container } from '../../../shared/ui-components/Container'
import { useTranslation } from '@eckert-preisser/shared/hooks'
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
  const { t } = useTranslation()
  const [services, setServices] = useState<ServiceStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [lastCheck, setLastCheck] = useState<Date>(new Date())

  const serviceList = [
    { name: t('status.services.eureka'), url: 'http://localhost:8761/actuator/health', port: 8761 },
    { name: t('status.services.config'), url: 'http://localhost:8888/actuator/health', port: 8888 },
    { name: t('status.services.gateway'), url: 'http://localhost:8080/actuator/health', port: 8080 },
  ]

  const checkServices = async () => {
    logger.info('STATUS_001', 'Checking service health')
    setLoading(true)

    const results = await Promise.all(
      serviceList.map(async (service) => {
        try {
          const response = await fetch(service.url, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
          })

          if (response.ok) {
            const data = await response.json()
            return {
              name: service.name,
              url: service.url,
              port: service.port,
              status: data.status === 'UP' ? 'UP' as const : 'DOWN' as const,
            }
          }
          return {
            name: service.name,
            url: service.url,
            port: service.port,
            status: 'DOWN' as const,
          }
        } catch (error) {
          logger.warn('STATUS_WARN_001', `Service ${service.name} unreachable`, { service: service.name })
          return {
            name: service.name,
            url: service.url,
            port: service.port,
            status: 'DOWN' as const,
          }
        }
      })
    )

    setServices(results)
    setLastCheck(new Date())
    setLoading(false)
    logger.info('STATUS_002', 'Service health check complete', { total: results.length })
  }

  useEffect(() => {
    checkServices()
    const interval = setInterval(checkServices, 30000) // Refresh every 30s
    return () => clearInterval(interval)
  }, [])

  const healthyCount = services.filter(s => s.status === 'UP').length
  const overallStatus = healthyCount === services.length ? 'operational'
    : healthyCount > 0 ? 'degraded'
    : 'down'

  return (
    <div className="pt-32 pb-20 bg-eckert-white">
      <Container>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-black mb-4 text-black">{t('status.title')}</h1>
          <p className="text-black/60 mb-12">{t('status.subtitle')}</p>

          {/* Overall Status */}
          <div className={`
            p-6 rounded-lg border-2 mb-12
            ${overallStatus === 'operational' ? 'bg-green-50 border-green-500' : ''}
            ${overallStatus === 'degraded' ? 'bg-yellow-50 border-yellow-500' : ''}
            ${overallStatus === 'down' ? 'bg-red-50 border-red-500' : ''}
          `}>
            <h2 className="text-2xl font-bold mb-2 text-black">{t('status.overall.title')}</h2>
            <p className={`text-lg font-semibold
              ${overallStatus === 'operational' ? 'text-green-700' : ''}
              ${overallStatus === 'degraded' ? 'text-yellow-700' : ''}
              ${overallStatus === 'down' ? 'text-red-700' : ''}
            `}>
              {overallStatus === 'operational' && t('status.overall.operational')}
              {overallStatus === 'degraded' && t('status.overall.degraded')}
              {overallStatus === 'down' && t('status.overall.down')}
            </p>
            <p className="text-black/60 text-sm mt-2">
              {healthyCount} / {services.length} {t('status.service.healthy')}
            </p>
          </div>

          {/* Backend Services */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-black">{t('status.backend.title')}</h2>
              <button
                onClick={checkServices}
                disabled={loading}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50"
              >
                {t('status.refresh')}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.url}
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
                      {service.status === 'UP' && t('status.service.healthy')}
                      {service.status === 'DOWN' && t('status.service.unhealthy')}
                      {service.status === 'UNKNOWN' && t('status.service.unknown')}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-black/70">
                    <p>
                      <span className="font-semibold text-black">{t('status.port')}:</span> {service.port}
                    </p>
                    {service.version && (
                      <p>
                        <span className="font-semibold text-black">{t('status.version')}:</span> {service.version}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Last Check */}
          <div className="text-center text-black/60 text-sm">
            {t('status.last.check')}: {lastCheck.toLocaleTimeString('de-DE')}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Status
