import { Link } from 'react-router-dom'
import { Container } from '../../../shared/ui-components/Container'
import { useTranslation } from '@eckert-preisser/shared/hooks'

const Footer = () => {
  const { t } = useTranslation()
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
              {t('footer.tagline')}
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              {t('footer.company')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  {t('nav.products')}
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  {t('nav.dashboard')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              {t('footer.legal')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/datenschutz"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  {t('legal.privacy')}
                </Link>
              </li>
              <li>
                <Link
                  to="/impressum"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  {t('legal.imprint')}
                </Link>
              </li>
              <li>
                <Link
                  to="/cookie-policy"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  {t('legal.cookies')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + Status */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              {t('footer.contact')}
            </h4>
            <p className="text-white/80 mb-2">
              <span className="font-semibold text-white">{t('footer.email')}:</span><br />
              info@eckertpreisser.de
            </p>
            <p className="text-white/80 mb-4">
              <span className="font-semibold text-white">{t('footer.phone')}:</span><br />
              +49 (0) 123 456789
            </p>
            <Link
              to="/status"
              className="text-white/80 hover:text-white transition-colors duration-300 block"
            >
              {t('footer.status')}
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
            {t('footer.copyright', { '0': currentYear })}
          </p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
