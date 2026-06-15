/* eslint-env node */
import { Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './globals.css'
import { CustomSearch } from './components/custom-search'
import { SidebarIcon } from './components/sidebar-icon'

function TelegramIcon({ size = 16 }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M15.7 1.2 13.3 12c-.2.8-.7.9-1.3.6L8.7 10l-1.8 1.7c-.2.2-.4.4-.7.4l.3-3.6L13 3c.3-.2 0-.4-.4-.2L4.2 8.2.7 7c-.8-.2-.8-.7.2-1L14.9.1c.6-.2 1.2.2 1 1.1Z" />
    </svg>
  )
}

function DiscordIcon({ size = 16 }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M13.5 3.1A11.5 11.5 0 0 0 10.6 2c-.1.2-.3.5-.4.7a10.7 10.7 0 0 0-3.2 0c-.1-.2-.3-.5-.4-.7A11.5 11.5 0 0 0 3.5 3.1c-1.8 2.7-2.3 5.3-2 7.8a11.7 11.7 0 0 0 3.5 1.8c.3-.4.5-.8.7-1.2-.4-.2-.8-.4-1.1-.6l.3-.2a8.4 8.4 0 0 0 7.2 0l.3.2c-.3.2-.7.4-1.1.6.2.4.5.8.7 1.2 1.3-.4 2.5-1 3.5-1.8.4-2.9-.5-5.5-2-7.8ZM6 9.7c-.7 0-1.2-.6-1.2-1.4S5.3 6.9 6 6.9s1.3.6 1.2 1.4c0 .8-.5 1.4-1.2 1.4Zm4 0c-.7 0-1.2-.6-1.2-1.4s.5-1.4 1.2-1.4 1.3.6 1.2 1.4c0 .8-.5 1.4-1.2 1.4Z" />
    </svg>
  )
}

function MultiPediaFooter() {
  const year = new Date().getFullYear()

  return (
    <div className="mp-footer">
      <div className="mp-footer-bar" />
      <div className="mp-footer-main">
        <div className="mp-footer-brand">
          <span className="mp-footer-logo">
            <img src="/assets/mpedia logo.svg" alt="" />
          </span>
          <span>
            <strong>Multi-педия</strong>
            <small>База знаний MultiPunk</small>
          </span>
        </div>
        <nav className="mp-footer-links" aria-label="Соцсети">
          <a href="https://t.me/multipunk" aria-label="Telegram">
            <TelegramIcon size={16} />
            <span>Telegram</span>
          </a>
          <a href="https://discord.gg/maGFJbf32V" aria-label="Discord">
            <DiscordIcon size={16} />
            <span>Discord</span>
          </a>
        </nav>
      </div>
      <div className="mp-footer-meta">
        <span>MIT {year} © MultiPedia.</span>
        <span>Built with Nextra</span>
      </div>
    </div>
  )
}

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
  
  const navbar = (
    <Navbar
      logoLink="/"
      logo={
        <div className="mp-logo">
          <span className="mp-logo-mark">
            <img 
              src="/assets/mpedia logo.svg" 
              alt="MultiPedia Logo"
            />
          </span>
          <span className="mp-logo-text">
            <span className="mp-logo-name"><span>Multi</span>-педия</span>
            <span className="mp-logo-tagline">Чуть больше чем ванила</span>
          </span>

        </div>
      }
      chatLink="https://discord.gg/maGFJbf32V"
    >

      <a className="mp-social-link" href="https://t.me/multipunk" aria-label="Telegram">
        <TelegramIcon size={16} />

      </a>
    </Navbar>
  )
  const pageMap = await getPageMap()
  return (
    <html lang="ru" dir="ltr" className="dark" suppressHydrationWarning>
      <Head faviconGlyph="✦" />
      <body className="multipedia-theme">
        <Layout
          navbar={navbar}
          search={<CustomSearch />} 
          copyPageButton={false}
          darkMode={false}
          nextThemes={{ forcedTheme: 'dark' }}
          toc={{
            title: "На этой странице"
          }}
          footer={<MultiPediaFooter />}
          editLink="Редактировать на GitHub"
          docsRepositoryBase="https://github.com/multi-punk/MultiPedia/tree/main/"
          feedback={feedbacks}
          sidebar={{ defaultMenuCollapseLevel: 1, toggleButton: false }}
          pageMap={pageMap}
        >
          <SidebarIcon />
          {children}
        </Layout>
      </body>
    </html>
  )
}
