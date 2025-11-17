'use client'

import { Search } from 'nextra/components'

export function CustomSearch() {
  return (
    <Search
      placeholder="Искать на Ozon…"  
      emptyResult="Ничего не найдено"    
      errorText="Товар не найден"
      loading="Загрузка…"
    />
  )
}
