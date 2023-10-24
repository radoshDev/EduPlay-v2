export const setUITheme = (theme: string): void => {
  document.querySelector('html')!.setAttribute('data-theme', theme)
}
