import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs' // nextra-theme-blog or your custom theme
import { CustomEmoji } from './app/components/custom-emoji'
import { ChangelogNote } from './app/components/changelog-note'
 
// Get the default MDX components
const themeComponents = getThemeComponents()
 
// Merge components
export function useMDXComponents(components) {
  return {
    ...themeComponents,
    CustomEmoji,
    ChangelogNote,
    ...components
  }
}