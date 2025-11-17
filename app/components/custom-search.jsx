'use client'

import { Search } from 'nextra/components'

export function CustomSearch() {
  return (
    <Search
      placeholder="Поиск по сайту…"  
      emptyResult="Ничего не найдено"    
      errorText="Ошибка загрузки индекса"
      loading="Загрузка…"
    />
  )
}
