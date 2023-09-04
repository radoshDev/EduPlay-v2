import './assets/main.css'
import 'vue-toast-notification/dist/theme-sugar.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  BiBoxArrowInLeft,
  BiGithub,
  BiGearFill,
  BiImageFill,
  BiPlusCircleFill,
  BiCashCoin,
  MdArrowbackiosOutlined,
  MdArrowforwardiosOutlined,
  MdMorevert,
  FaRegularEdit,
  FaWikipediaW,
  FaQuestionCircle,
  FcCalculator,
  FcReadingEbook,
  HiSolidArrowNarrowLeft,
  HiSolidArrowNarrowRight,
  IoLibrarySharp,
  IoCloseCircleSharp
} from 'oh-vue-icons/icons'

addIcons(
  BiBoxArrowInLeft,
  BiCashCoin,
  BiGithub,
  BiGearFill,
  BiImageFill,
  BiPlusCircleFill,
  MdArrowbackiosOutlined,
  MdArrowforwardiosOutlined,
  MdMorevert,
  FaRegularEdit,
  FaWikipediaW,
  FcCalculator,
  FaQuestionCircle,
  FcReadingEbook,
  HiSolidArrowNarrowLeft,
  HiSolidArrowNarrowRight,
  IoLibrarySharp,
  IoCloseCircleSharp
)

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.component('v-icon', OhVueIcon)
app.use(router)
app.mount('#app')
