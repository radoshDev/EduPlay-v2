import './assets/main.css'
import 'vue-toast-notification/dist/theme-sugar.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { addIcons } from 'oh-vue-icons'
import {
  BiBoxArrowInLeft,
  BiGithub,
  BiGearFill,
  BiImageFill,
  BiPlusCircleFill,
  BiCashCoin,
  MdArrowbackiosOutlined,
  MdArrowforwardiosOutlined,
  MdDeleteforeverRound,
  MdMorevert,
  MdRemovecircle,
  FaRegularEdit,
  FaWikipediaW,
  FaQuestionCircle,
  FcCalculator,
  FcReadingEbook,
  HiSolidArrowNarrowLeft,
  HiSolidArrowNarrowRight,
  HiSwitchHorizontal,
  HiSearch,
  IoCloseCircleSharp,
  IoLibrarySharp,
  IoLinkSharp,
  IoReloadSharp,
  IoReloadCircle,
  IoRocketSharp
} from 'oh-vue-icons/icons'
import { AlertNotification, Image, PreloaderBlock } from '@/components/ui'
import { OhIcon } from './components/ui/icons'
import { ButtonMain } from './components/ui/buttons'

addIcons(
  BiBoxArrowInLeft,
  BiCashCoin,
  BiGithub,
  BiGearFill,
  BiImageFill,
  BiPlusCircleFill,
  MdArrowbackiosOutlined,
  MdArrowforwardiosOutlined,
  MdDeleteforeverRound,
  MdMorevert,
  MdRemovecircle,
  FaRegularEdit,
  FaWikipediaW,
  FcCalculator,
  FaQuestionCircle,
  FcReadingEbook,
  HiSolidArrowNarrowLeft,
  HiSolidArrowNarrowRight,
  HiSwitchHorizontal,
  HiSearch,
  IoCloseCircleSharp,
  IoLibrarySharp,
  IoLinkSharp,
  IoReloadSharp,
  IoReloadCircle,
  IoRocketSharp
)

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.component('v-alert', AlertNotification)
app.component('v-btn', ButtonMain)
app.component('v-icon', OhIcon)
app.component('v-image', Image)
app.component('v-loader', PreloaderBlock)
app.use(router)
app.mount('#app')
