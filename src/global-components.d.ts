import { AlertNotification, Image, PreloaderBlock } from './components/ui'
import { OhIcon } from './components/ui/icons'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VImage: typeof Image
    VIcon: typeof OhIcon
    VLoader: typeof PreloaderBlock
    VAlert: typeof AlertNotification
  }
}
