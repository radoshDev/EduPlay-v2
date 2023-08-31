import './assets/main.css'
import 'vue-toast-notification/dist/theme-sugar.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { BiBoxArrowInLeft, BiGithub, BiGearFill, BiPlusCircleFill } from 'oh-vue-icons/icons'

addIcons(BiBoxArrowInLeft, BiGithub, BiGearFill, BiPlusCircleFill)

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.component('v-icon', OhVueIcon)
app.use(router)
app.mount('#app')
