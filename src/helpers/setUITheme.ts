import type { ThemeName } from '@/types'

export const setUITheme = (theme: ThemeName): void => {
  document.querySelector('html')!.setAttribute('data-theme', theme)
}
