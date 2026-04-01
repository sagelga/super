/**
 * Remark plugin that transforms :::type directives into <Admonition> JSX.
 *
 * Note: unist-util-visit is not available in this project, so this plugin
 * operates on the raw markdown string via a preprocessor function rather than
 * walking the AST. Use preprocessAdmonitions() before passing content to a
 * markdown renderer, or use remarkAdmonitions as a remark string transformer.
 *
 * Supported types: tip, info, note, warning, caution, danger
 *
 * Input:
 *   :::tip Optional Title
 *   Content here.
 *   :::
 *
 * Output (MDX):
 *   <Admonition type="tip" title="Optional Title">
 *   Content here.
 *   </Admonition>
 */

const ADMONITION_TYPES = ['tip', 'info', 'note', 'warning', 'caution', 'danger']

// Matches opening fence: :::type or :::type Title text
const OPEN_RE = new RegExp(
  `^:::(${ADMONITION_TYPES.join('|')})(\\s+(.+))?$`,
)
const CLOSE_RE = /^:::$/

/**
 * Preprocesses a markdown/MDX string, replacing Docusaurus-style admonition
 * fences with <Admonition> JSX component calls suitable for MDX rendering.
 */
export function preprocessAdmonitions(content: string): string {
  const lines = content.split('\n')
  const output: string[] = []

  for (const line of lines) {
    const openMatch = line.match(OPEN_RE)
    if (openMatch) {
      const type = openMatch[1]
      const title = openMatch[3]?.trim()
      const titleAttr = title ? ` title="${title.replace(/"/g, '&quot;')}"` : ''
      output.push(`<Admonition type="${type}"${titleAttr}>`)
      continue
    }

    if (CLOSE_RE.test(line.trim())) {
      output.push('</Admonition>')
      continue
    }

    output.push(line)
  }

  return output.join('\n')
}

/**
 * Unified/remark plugin that preprocesses admonition syntax on the raw
 * source string before the AST is built. Attach this as a string transformer
 * or call preprocessAdmonitions directly on your content string.
 *
 * Usage with next-mdx-remote or similar:
 *   const processedSource = preprocessAdmonitions(rawSource)
 *   // then compile processedSource as MDX
 */
export function remarkAdmonitions() {
  // This is a no-op unified plugin — the actual transformation is done
  // via preprocessAdmonitions() on the raw string before parsing. Kept here
  // so the import path is consistent with the rest of the remark plugin chain.
  return () => {}
}
