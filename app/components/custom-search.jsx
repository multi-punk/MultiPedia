'use client'

import { Search } from 'nextra/components'

export function CustomSearch() {
  return (
    <Search
      placeholder="Искать на MultiPedia…"  
      emptyResult="Ничего не найдено"    
      errorText="Ничего не найдено"
      loading="Поиск…"
    />
  )
}
