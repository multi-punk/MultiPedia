/* eslint-env node */
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import { CustomSearch } from './components/custom-search'
import { SidebarIcon } from './components/sidebar-icon'


export const metadata = {
  metadataBase: new URL('https://nextra.site'),
  title: {
    template: '%s - MultiPunk'
  },
  description: 'Добро пожаловать в MultiPedia',
  applicationName: 'MultiPedia',
  generator: 'Next.js',
  appleWebApp: {
    title: 'MultiPedia'
  },
  other: {
    'msapplication-TileImage': '/ms-icon-144x144.png',
    'msapplication-TileColor': '#fff'
  }
}

export default async function RootLayout({ children }) {
  const feedbacks = {
    content: "Предложить изменение"
  }
  const searchs = {
      placeholde: "Поиск по сайту…",
      emptyResult: "Ничего не найдено",
      errorText: "Ошибка загрузки индекса",
      loading: "Загрузка…"
  }
  const navbar = (
    <Navbar
      logoLink="../guides"
      logo={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img 
            src="/assets/mpedia logo.svg" 
            alt="MultiPedia Logo" 
            style={{ height: '34px', width: 'auto' }}
          />
          <b>Multi-педия</b>{' '}
          <span style={{ opacity: '60%' }}>Больше чем ванила</span>
        </div>
      }
    />
  )
  const pageMap = await getPageMap()
  return (
    <html lang="ru" dir="ltr" className="dark" suppressHydrationWarning>
      <Head faviconGlyph="✦" />
      <body>
        <Layout
          navbar={navbar}
          search={<CustomSearch />} 
          copyPageButton={false}
          darkMode={false}
          nextThemes={{ forcedTheme: 'dark' }}
          toc={{
            title: "На этой странице"
          }}
          footer={<Footer>MIT {new Date().getFullYear()} © MultiPedia.</Footer>}
          editLink="Редактировать на GitHub"
          docsRepositoryBase="https://github.com/multi-punk/MultiPedia/tree/main/"
          feedback={feedbacks}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          pageMap={pageMap}
        >
          <SidebarIcon />
          {children}
        </Layout>
      </body>
    </html>
  )
}
