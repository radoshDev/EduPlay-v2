import type { ValueOf } from '@/types'
import type { RouteName } from '@/utils/constants'
import type { RouteRecordRaw } from 'vue-router'
import { requiredAuthGuard, requiredNotAuthGuard } from './routesGuards'
import { setStudentIdHandler } from './routeHandlers'

export type RouteRecord = Omit<RouteRecordRaw, 'name'> & {
  name: ValueOf<typeof RouteName>
}

const HomePage = () => import('@/pages/HomePage.vue')
const StudentsPage = () => import('@/pages/students/StudentsPage.vue')
const AddStudentPage = () => import('@/pages/students/AddStudentPage.vue')
const UpdateStudentPage = () => import('@/pages/students/UpdateStudentPage.vue')
const StudentInfoPage = () => import('@/pages/students/StudentInfoPage.vue')
const EducationMenuPage = () =>
  import('@/pages/education/EducationMenuPage.vue')
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
    path: '/students/add',
    name: 'student-add',
    component: AddStudentPage,
    meta: { title: 'Новий студент' }
  },
  {
    path: '/students/:studentId',
    name: 'student-info',
    component: StudentInfoPage,
    beforeEnter: setStudentIdHandler,
    meta: { title: 'Дані студента' }
  },
  {
    path: '/students/:studentId/update',
    name: 'student-update',
    component: UpdateStudentPage,
    beforeEnter: setStudentIdHandler,
    meta: { title: 'Редагування Студента' }
  },
  {
    path: '/education/:studentId',
    name: 'education-menu',
    component: EducationMenuPage,
    beforeEnter: setStudentIdHandler,
    meta: { title: 'Завдання' }
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
