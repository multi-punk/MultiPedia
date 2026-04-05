import fs from 'fs'
import path from 'path'
import Link from 'next/link'

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  const result = {}
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    let value = line.slice(colonIdx + 1).trim()
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
    }
    result[key] = value
  }
  return result
}

export async function BlogIndex() {
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
        description: fm.description ?? null,
        tags: Array.isArray(fm.tags) ? fm.tags : [],
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  if (posts.length === 0) {
    return <p style={{ opacity: 0.6 }}>Постов пока нет.</p>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1.5rem' }}>
      {posts.map((post) => (
        <Link
          key={post.route}
          href={post.route}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div style={{ borderLeft: '3px solid var(--nextra-primary-hue, #888)', paddingLeft: '1rem' }}>
            {post.date && (
              <p style={{ fontSize: '0.8rem', opacity: 0.5, margin: '0 0 0.25rem' }}>
                {new Date(post.date).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            )}
            <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem' }}>{post.title}</h2>
            {post.description && (
              <p style={{ margin: '0 0 0.5rem', opacity: 0.7, fontSize: '0.95rem' }}>
                {post.description}
              </p>
            )}
            {post.tags.length > 0 && (
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.1rem 0.5rem',
                      borderRadius: '999px',
                      background: 'rgba(128,128,128,0.15)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}
