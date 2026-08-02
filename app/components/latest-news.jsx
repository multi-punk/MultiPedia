import fs from 'fs'
import path from 'path'

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  const result = {}
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    result[key] = line.slice(colonIdx + 1).trim()
  }
  return result
}

function firstImage(content) {
  const match = content.match(/!\[.*?\]\((.*?)\)/)
  return match ? match[1] : null
}

/** Последние N новостей из content/blog, подтягиваются автоматически по дате из фронтматтера. */
export function LatestNews({ count = 3 }) {
  const blogDir = path.join(process.cwd(), 'content/blog')

  const posts = fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith('.mdx') && f !== 'index.mdx')
    .map((filename) => {
      const content = fs.readFileSync(path.join(blogDir, filename), 'utf8')
      const fm = parseFrontmatter(content)
      const slug = filename.replace(/\.mdx$/, '')
      return {
        route: `/blog/${slug}`,
        title: fm.title ?? slug,
        date: fm.date ?? null,
        image: firstImage(content),
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, count)

  return (
    <div className="mp-home-news">
      {posts.map((post) => (
        <a key={post.route} href={post.route}>
          {post.image && <img src={post.image} alt="" />}
          <strong>{post.title}</strong>
          <small>Читайте список изменений</small>
        </a>
      ))}
    </div>
  )
}
