import type { ValueOf } from '@/types'
import type { RouteName } from '@/utils/constants'
import type { RouteRecordRaw } from 'vue-router'
import { requiredAuthGuard } from './routesGuards'

export type RouteRecord = Omit<RouteRecordRaw, 'name'> & {
  name: ValueOf<typeof RouteName>
}

const HomePage = () => import('@/pages/HomePage.vue')
const NotFoundPage = () => import('@/pages/NotFoundPage.vue')
const LoginPage = () => import('@/pages/auth/LoginPage.vue')
const RegisterPage = () => import('@/pages/auth/RegisterPage.vue')

const routes: RouteRecord[] = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    beforeEnter: requiredAuthGuard,
    meta: { title: 'Головна' }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: { title: 'Логін' }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
    meta: { title: 'Реєстрація' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundPage,
    meta: { title: '404' }
  }
]

export default routes
