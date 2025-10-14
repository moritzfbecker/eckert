import { Link } from 'react-router-dom'
import { Container } from '../../../shared/ui-components/Container'
import { t } from '../../../shared/utils/i18n'

const Footer = () => {
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
            <p className="text-white mb-4">
              Enterprise-level solutions for modern businesses.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              {t('nav.home')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-white hover:text-white/80 transition-colors duration-300"
                >
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-white hover:text-white/80 transition-colors duration-300"
                >
                  {t('nav.products')}
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-white hover:text-white/80 transition-colors duration-300"
                >
                  {t('nav.dashboard')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="text-white hover:text-white/80 transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-white hover:text-white/80 transition-colors duration-300"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/imprint"
                  className="text-white hover:text-white/80 transition-colors duration-300"
                >
                  Imprint
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <p className="text-white">
              Email: info@eckert-preisser.com
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="
          mt-12 pt-8
          border-t border-white/10
          text-center
        ">
          <p className="text-white">
            © {currentYear} Eckert Preisser Enterprise. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
