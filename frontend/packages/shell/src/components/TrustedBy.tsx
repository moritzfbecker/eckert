/**
 * TrustedBy Component - Company References Section
 *
 * Animated logo scroller with two rows (LTR and RTL)
 * Category: 'homepage'
 * Design: Black/White with infinite scroll animations
 */

import React from 'react'
import { useScrollAnimation } from '@eckert-preisser/shared/hooks'
import { useConfig, useTranslation } from '@eckert-preisser/shared/hooks'

interface Logo {
  name: string
  path: string
}

// Company logos - two rows for animation
const BASE_PATH = import.meta.env.BASE_URL

const logosRow1: Logo[] = [
  { name: 'Deutsche Bank', path: `${BASE_PATH}logos/deutschebank.svg` },
  { name: 'Helios', path: `${BASE_PATH}logos/Helios.svg` },
  { name: 'Kolbenschmidt', path: `${BASE_PATH}logos/kolbenschmidt.svg` },
  { name: 'Motorola', path: `${BASE_PATH}logos/motorola.svg` },
  { name: 'Müller', path: `${BASE_PATH}logos/mueller.svg` },
  { name: 'MVV', path: `${BASE_PATH}logos/mvv.svg` },
  { name: 'Optima', path: `${BASE_PATH}logos/optima.svg` },
  { name: 'Pfalzklinikum', path: `${BASE_PATH}logos/pfalzklinikum.svg` },
  { name: 'Sana', path: `${BASE_PATH}logos/sana.svg` }
]

const logosRow2: Logo[] = [
  { name: 'Big Dutchman', path: `${BASE_PATH}logos/Big_Dutchman.svg` },
  { name: 'Christophorus Kliniken', path: `${BASE_PATH}logos/Christophorus-Kliniken_Logo.svg` },
  { name: 'Coperion', path: `${BASE_PATH}logos/Coperion.svg` },
  { name: 'Harro Höfliger', path: `${BASE_PATH}logos/Harro_Höfliger.svg` },
  { name: 'Mapal', path: `${BASE_PATH}logos/Mapal.svg` },
  { name: 'Mesto', path: `${BASE_PATH}logos/mesto.svg` },
  { name: 'Teamtechnik', path: `${BASE_PATH}logos/Teamtechnik.svg` },
  { name: 'Zeppelin', path: `${BASE_PATH}logos/zeppelin.svg` }
]

const LogoScroller: React.FC<{ logos: Logo[]; rtl?: boolean; isVisible: boolean }> = ({
  logos,
  rtl = false,
  isVisible
}) => {
  // Duplicate logos enough times to ensure seamless scrolling on wide screens
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos]

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const ul = e.currentTarget.querySelector('ul')
    if (ul) ul.style.animationPlayState = 'paused'
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const ul = e.currentTarget.querySelector('ul')
    if (ul) ul.style.animationPlayState = 'running'
  }

  return (
    <div
      className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ul
        className={`
          flex items-center justify-center md:justify-start [&_li]:mx-8
          ${isVisible ? (rtl ? 'animate-scroll-rtl' : 'animate-scroll-ltr') : ''}
        `}
      >
        {duplicatedLogos.map((logo, index) => (
          <li key={index} className="flex items-center">
            <img
              src={logo.path}
              alt={logo.name}
              className="h-16 w-auto max-w-[200px] transition-all duration-300 object-contain filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
              onError={(e) => {
                // Fallback if image not found - show text
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                const span = document.createElement('span')
                span.textContent = logo.name
                span.className = 'text-black font-medium text-xl tracking-wider'
                target.parentElement?.appendChild(span)
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

const TrustedBy: React.FC = () => {
  const { language } = useTranslation()
  const config = useConfig('homepage', language)
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section
      ref={ref}
      className={`
        py-20 md:py-24
        transition-all duration-1000 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-sm font-semibold text-black/40 mb-12 tracking-widest uppercase">
          {config.get('trustedBy.title', 'Trusted by Leading Companies')}
        </h2>
        <div className="space-y-8">
          <LogoScroller logos={logosRow1} isVisible={isVisible} />
          <LogoScroller logos={logosRow2} rtl={true} isVisible={isVisible} />
        </div>
      </div>
    </section>
  )
}

export default TrustedBy
