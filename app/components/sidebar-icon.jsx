'use client'

import { useEffect } from 'react'

export function SidebarIcon() {
  useEffect(() => {
    // Функция для добавления иконки к элементу "Самоцвет"
    const addIconToGemstone = () => {
      // Ищем все ссылки, содержащие "multigem" в href
      const links = document.querySelectorAll('a[href*="multigem"]')
      
      links.forEach(link => {
        // Проверяем, нет ли уже иконки
        if (link.querySelector('.custom-gemstone-icon')) {
          return
        }
        
        // Проверяем, что это ссылка на Самоцвет (содержит текст "Самоцвет")
        const linkText = link.textContent?.trim()
        if (linkText === 'Самоцвет' || linkText?.includes('Самоцвет')) {
          // Создаем элемент иконки
          const icon = document.createElement('img')
          icon.src = '/assets/items_and_blocks/multigem.png'
          icon.alt = 'Самоцвет'
          icon.className = 'custom-gemstone-icon'
          icon.style.cssText = `
            width: 24px;
            height: 24px;
            min-width: 24px;
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
            image-rendering: pixelated;
            margin-right: 8px;
            flex-shrink: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            vertical-align: baseline;
            transform: translateY(2px);
            object-fit: contain;
          `
          
          // Вставляем иконку перед текстом
          if (link.firstChild) {
            link.insertBefore(icon, link.firstChild)
          } else {
            link.appendChild(icon)
          }
        }
      })
    }
    
    // Вызываем сразу
    addIconToGemstone()
    
    // Также вызываем после небольшой задержки (на случай, если DOM еще не готов)
    const timeout = setTimeout(addIconToGemstone, 100)
    
    // Наблюдаем за изменениями DOM (на случай динамической загрузки)
    const observer = new MutationObserver(addIconToGemstone)
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
    
    return () => {
      clearTimeout(timeout)
      observer.disconnect()
    }
  }, [])
  
  return null
}
