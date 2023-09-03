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
  BiPlusCircleFill,
  BiCashCoin,
  MdArrowbackiosOutlined,
  MdArrowforwardiosOutlined,
  FaRegularEdit,
  FcCalculator,
  FcReadingEbook,
  IoLibrarySharp
} from 'oh-vue-icons/icons'

addIcons(
  BiBoxArrowInLeft,
  BiGithub,
  BiGearFill,
  BiPlusCircleFill,
  MdArrowbackiosOutlined,
  MdArrowforwardiosOutlined,
  FaRegularEdit,
  FcCalculator,
  FcReadingEbook,
  BiCashCoin,
  IoLibrarySharp
)

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.component('v-icon', OhVueIcon)
app.use(router)
app.mount('#app')
