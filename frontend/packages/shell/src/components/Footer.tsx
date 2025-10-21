import { Link } from 'react-router-dom'
import { Container } from '../../../shared/ui-components/Container'
import { useConfig, useTranslation } from '@eckert-preisser/shared/hooks'

/**
 * Footer Component - v2.0 Config API
 *
 * Uses NEW useConfig Hook for translations with auto-registration.
 * Category: 'common' (shared navigation and footer texts)
 */
const Footer = () => {
  // Get current language from I18nContext
  const { language } = useTranslation()

  // NEW v2.0: useConfig with 'common' category and DYNAMIC language
  const config = useConfig('common', language)
  const currentYear = new Date().getFullYear()

  return (
    <footer className="
      bg-black text-white
      border-t border-white/10
      py-12
    ">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">
              Eckert Preisser
            </h3>
            <p className="text-white/80 mb-4">
              {config.get('footer.tagline', 'Enterprise-level solutions for modern businesses.')}
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              {config.get('footer.company', 'Company')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  {config.get('nav.home', 'Home')}
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  {config.get('nav.products', 'Products')}
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  {config.get('nav.dashboard', 'Dashboard')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              {config.get('footer.legal', 'Legal')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/datenschutz"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  {config.get('legal.privacy', 'Privacy Policy')}
                </Link>
              </li>
              <li>
                <Link
                  to="/impressum"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  {config.get('legal.imprint', 'Imprint')}
                </Link>
              </li>
              <li>
                <Link
                  to="/cookie-policy"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  {config.get('legal.cookies', 'Cookie Policy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + Status */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              {config.get('footer.contact', 'Contact')}
            </h4>
            <p className="text-white/80 mb-2">
              <span className="font-semibold text-white">{config.get('footer.email', 'Email')}:</span><br />
              info@eckertpreisser.de
            </p>
            <p className="text-white/80 mb-4">
              <span className="font-semibold text-white">{config.get('footer.phone', 'Phone')}:</span><br />
              +49 (0) 123 456789
            </p>
            <Link
              to="/status"
              className="text-white/80 hover:text-white transition-colors duration-300 block"
            >
              {config.get('footer.status', 'System Status')}
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="
          mt-12 pt-8
          border-t border-white/10
          text-center
        ">
          <p className="text-white/80">
            {config.get('footer.copyright', `© {0} Eckert Preisser Enterprise. All rights reserved.`).replace('{0}', currentYear.toString())}
          </p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
