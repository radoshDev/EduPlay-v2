import type { ValueOf } from '@/types'
import type { RouteName } from '@/utils/constants'
import type { RouteRecordRaw } from 'vue-router'
import { requiredAuthGuard, requiredNotAuthGuard } from './routesGuards'

export type RouteRecord = Omit<RouteRecordRaw, 'name'> & {
  name: ValueOf<typeof RouteName>
}

const HomePage = () => import('@/pages/HomePage.vue')
const StudentsPage = () => import('@/pages/students/StudentsPage.vue')
const AccountPage = () => import('@/pages/AccountPage.vue')
const LoginPage = () => import('@/pages/auth/LoginPage.vue')
const RegisterPage = () => import('@/pages/auth/RegisterPage.vue')
const NotFoundPage = () => import('@/pages/NotFoundPage.vue')

const routes: RouteRecord[] = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    beforeEnter: requiredNotAuthGuard,
    meta: { title: 'Головна' }
  },
  {
    path: '/students',
    name: 'students',
    component: StudentsPage,
    beforeEnter: requiredAuthGuard,
    meta: { title: 'Студенти' }
  },
  {
    path: '/account',
    name: 'account',
    component: AccountPage,
    beforeEnter: requiredAuthGuard,
    meta: { title: 'Обліковий запис' }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    beforeEnter: requiredNotAuthGuard,
    meta: { title: 'Логін' }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
    beforeEnter: requiredNotAuthGuard,
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
