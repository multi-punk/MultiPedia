/* eslint-env node */
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata = {
  metadataBase: new URL('https://nextra.site'),
  title: {
    template: '%s - Nextra'
  },
  description: 'Nextra: the Next.js site builder',
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
      logoLink="../guides"
      logo={
        <div>
          <b>MultiPedia</b>{' '}
          <span style={{ opacity: '60%' }}>В майнкрафте лучше</span>
        </div>
      }
    />
  )
  const pageMap = await getPageMap()
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head faviconGlyph="✦" />
      <body>
        <Layout
          navbar={navbar}
          copyPageButton={false}
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
          {children}
        </Layout>
      </body>
    </html>
  )
}
