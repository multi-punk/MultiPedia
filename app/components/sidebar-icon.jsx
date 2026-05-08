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
        hrefIncludes: 'cooking/getting_started',
        textMatch: (t) => t === 'Первые шаги' || t?.includes('Первые шаги'),
        src: '/assets/guides/cooking/stackburger.png',
        alt: 'Первые шаги',
      })

      injectSidebarIcon({
        hrefIncludes: 'cooking/ingredients',
        textMatch: (t) =>
          t === 'Ингредиенты и подготовка' || t?.includes('Ингредиенты и подготовка'),
        src: '/assets/guides/cooking/flint_knife_alt_item.png',
        alt: 'Ингредиенты и подготовка',
      })

      injectSidebarIcon({
        hrefIncludes: 'cooking/process',
        textMatch: (t) => t === 'Процесс готовки' || t?.includes('Процесс готовки'),
        src: '/assets/guides/cooking/recipe_fragment.png',
        alt: 'Процесс готовки',
      })

      injectSidebarIcon({
        hrefIncludes: 'cooking/serving',
        textMatch: (t) => t === 'Сервировка и подача' || t?.includes('Сервировка и подача'),
        src: '/assets/guides/cooking/wooden_plate_item.png',
        alt: 'Сервировка и подача',
      })

      injectSidebarIcon({
        hrefIncludes: 'cooking/special_dishes',
        textMatch: (t) => t === 'Крафт и выпечка' || t?.includes('Крафт и выпечка'),
        src: '/assets/guides/cooking/berry_pie.png',
        alt: 'Крафт и выпечка',
      })

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

      injectSidebarIcon({
        hrefIncludes: 'dungens_and_creepers/boss-totemnik',
        textMatch: (t) => t === 'Босс тотемник' || t?.includes('Босс тотемник'),
        src: '/assets/dungeons_and_creepers/green_boss_core.png',
        alt: 'Ядро босса тотемника',
      })

      injectSidebarIcon({
        hrefIncludes: 'dungens_and_creepers/boss-fleytist',
        textMatch: (t) => t === 'Босс флейтист' || t?.includes('Босс флейтист'),
        src: '/assets/dungeons_and_creepers/purple_boss_core.png',
        alt: 'Ядро босса флейтиста',
      })

      injectSidebarIcon({
        hrefIncludes: 'dungens_and_creepers/boss-sklep',
        textMatch: (t) => t === 'Босс склеп' || t?.includes('Босс склеп'),
        src: '/assets/dungeons_and_creepers/yellow_boss_core.png',
        alt: 'Ядро босса склепа',
      })

      injectSidebarIcon({
        hrefIncludes: 'dungens_and_creepers/pipe-logistics',
        textMatch: (t) => t === 'Продвинутая логистика' || t?.includes('Продвинутая логистика'),
        src: '/assets/dungeons_and_creepers/pipe_ui_graphic.png',
        alt: 'Продвинутая логистика',
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
