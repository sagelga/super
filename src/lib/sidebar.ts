import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface SidebarItem {
  label: string
  href?: string
  children?: SidebarItem[]
  isActive?: boolean
}

function titleFromSlug(slug: string): string {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function buildTree(dirPath: string, urlBase: string): SidebarItem[] {
  if (!fs.existsSync(dirPath)) return []

  const entries = fs.readdirSync(dirPath, { withFileTypes: true })
  const items: SidebarItem[] = []

  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'authors.yml') continue

    const fullPath = path.join(dirPath, entry.name)
    const urlPath = `${urlBase}/${entry.name}`

    if (entry.isDirectory()) {
      // Check if there's a README inside
      const readmeNames = ['README.md', 'README.mdx', 'readme.md', 'index.md', 'index.mdx']
      let label = titleFromSlug(entry.name)

      for (const readme of readmeNames) {
        const rp = path.join(fullPath, readme)
        if (fs.existsSync(rp)) {
          const { data } = matter(fs.readFileSync(rp, 'utf-8'))
          label = (data.sidebar_label as string) || (data.title as string) || label
          break
        }
      }

      const children = buildTree(fullPath, urlPath)
      items.push({ label, href: urlPath, children: children.length > 0 ? children : undefined })
    } else if (
      (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) &&
      !entry.name.toLowerCase().startsWith('readme') &&
      !entry.name.toLowerCase().startsWith('index')
    ) {
      const raw = fs.readFileSync(fullPath, 'utf-8')
      const { data } = matter(raw)
      const slug = entry.name.replace(/\.(md|mdx)$/, '')
      const label = (data.sidebar_label as string) || (data.title as string) || titleFromSlug(slug)
      const href = `${urlBase}/${slug}`
      items.push({ label, href })
    }
  }

  return items.sort((a, b) => a.label.localeCompare(b.label))
}

export function buildSidebarTree(section: string, subPath?: string): SidebarItem[] {
  const contentRoot = path.join(process.cwd(), 'content', section)
  const basePath = subPath ? path.join(contentRoot, subPath) : contentRoot
  const urlBase = subPath ? `/${section}/${subPath}` : `/${section}`
  return buildTree(basePath, urlBase)
}
