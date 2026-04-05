import { normalizePages } from 'nextra/normalize-pages'
import { getPageMap } from 'nextra/page-map'
 
export async function getPosts() {
  // Получаем весь PageMap
  const pageMap = await getPageMap()

  // Находим папку с постами
  const postsFolder = pageMap.find(
    item => item.kind === 'folder' && item.name === 'posts'
  )

  if (!postsFolder || !postsFolder.children) return []

  return postsFolder.children
    .filter(post => post.kind === 'MdxPage' && post.frontMatter) // защита
    .map(post => {
      const fm = post.frontMatter
      return {
        ...post,
        frontMatter: fm,
        title: fm.title || post.name,
        date: fm.date || new Date(0).toISOString(),
        tags: fm.tags || [],
        description: fm.description || ''
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}
 
export async function getTags() {
  const posts = await getPosts()

  return posts.flatMap(post => post.tags || [])
}