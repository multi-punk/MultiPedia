'use client'

import { useEffect } from 'react'

export function SidebarIcon() {
  useEffect(() => {
    const injectSidebarIcon = ({
      hrefIncludes,
      textMatch,
      src,
      alt,
      skip,
    }) => {
      const links = document.querySelectorAll(`a[href*="${hrefIncludes}"]`)

      links.forEach((link) => {
        if (link.querySelector('.custom-sidebar-icon')) {
          return
        }
        if (skip?.(link)) {
          return
        }

        const linkText = link.textContent?.trim()
        if (!textMatch(linkText)) {
          return
        }

        const icon = document.createElement('img')
        icon.src = src
        icon.alt = alt
        icon.className = 'custom-sidebar-icon'
        icon.style.cssText = `
            width: 24px;
            height: 24px;
            min-width: 24px;
          `

        if (link.firstChild) {
          link.insertBefore(icon, link.firstChild)
        } else {
          link.appendChild(icon)
        }
      })
    }

    const run = () => {
      injectSidebarIcon({
        hrefIncludes: 'multigem',
        textMatch: (t) => t === 'Самоцвет' || t?.includes('Самоцвет'),
        src: '/assets/items_and_blocks/multi_gem.png',
        alt: 'Самоцвет',
        skip: (link) =>
          !!link.querySelector('img[src*="items_and_blocks"]'),
      })

      injectSidebarIcon({
        hrefIncludes: 'dungens_and_creepers/basics',
        textMatch: (t) => t === 'Основы' || t?.includes('Основы'),
        src: '/assets/dungeons_and_creepers/creeper_vault_key.png',
        alt: 'Зелёный ключ',
      })
    }

    run()
    const timeout = setTimeout(run, 100)

    const observer = new MutationObserver(run)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      clearTimeout(timeout)
      observer.disconnect()
    }
  }, [])

  return null
}
