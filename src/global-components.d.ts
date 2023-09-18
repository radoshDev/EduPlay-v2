import { AlertNotification, Image, PreloaderBlock } from './components/ui'
import { ButtonText } from './components/ui/buttons'
import { OhIcon } from './components/ui/icons'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VImage: typeof Image
    VIcon: typeof OhIcon
    VLoader: typeof PreloaderBlock
    VAlert: typeof AlertNotification
    VBtn: typeof ButtonText
  }
}
