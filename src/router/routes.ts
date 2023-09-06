import type { ValueOf } from '@/types'
import type { RouteName } from '@/utils/constants'
import type { RouteRecordRaw } from 'vue-router'
import { requiredAuthGuard, requiredNotAuthGuard } from './routesGuards'
import { setParamsHandler } from './routeHandlers'

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
const EducationTaskPage = () =>
  import('@/pages/education/EducationTaskPage.vue')
const LibraryCategoriesPage = () =>
  import('@/pages/library/LibraryCategoriesPage.vue')
const LibraryCategoriesNewPage = () =>
  import('@/pages/library/LibraryCategoriesNewPage.vue')
const LibrarySubcategoriesPage = () =>
  import('@/pages/library/LibrarySubcategoriesPage.vue')
const LibrarySubcategoriesNewPage = () =>
  import('@/pages/library/LibrarySubcategoriesNewPage.vue')
const LibraryTasksPage = () => import('@/pages/library/LibraryTasksPage.vue')
const LibraryTaskPage = () => import('@/pages/library/LibraryTaskPage.vue')
const LibraryTasksNewPage = () =>
  import('@/pages/library/LibraryTasksNewPage.vue')
const LibraryTaskEditPage = () =>
  import('@/pages/library/LibraryTaskEditPage.vue')
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
    beforeEnter: setParamsHandler,
    meta: { title: 'Дані студента' }
  },
  {
    path: '/students/:studentId/update',
    name: 'student-update',
    component: UpdateStudentPage,
    beforeEnter: setParamsHandler,
    meta: { title: 'Редагування Студента' }
  },
  {
    path: '/education/:studentId',
    name: 'education-menu',
    component: EducationMenuPage,
    beforeEnter: setParamsHandler,
    meta: { title: 'Список завдань' }
  },
  {
    path: '/education/:studentId/:taskType',
    name: 'education-task',
    component: EducationTaskPage,
    beforeEnter: setParamsHandler,
    meta: { title: 'Завдання' }
  },
  {
    path: '/library',
    name: 'library-categories',
    component: LibraryCategoriesPage,
    meta: { title: 'Категорії' }
  },
  {
    path: '/library/new',
    name: 'library-categories-new',
    component: LibraryCategoriesNewPage,
    meta: { title: 'Нова категорія' }
  },
  {
    path: '/library/:category',
    name: 'library-subcategories',
    component: LibrarySubcategoriesPage,
    beforeEnter: setParamsHandler,
    meta: { title: 'Підкатегорії' }
  },
  {
    path: '/library/:category/new',
    name: 'library-subcategories-new',
    component: LibrarySubcategoriesNewPage,
    beforeEnter: setParamsHandler,
    meta: { title: 'Нова підкатегорія' }
  },
  {
    path: '/library/:category/:subcategory',
    name: 'library-tasks',
    component: LibraryTasksPage,
    beforeEnter: setParamsHandler,
    meta: { title: 'Завдання' }
  },
  {
    path: '/library/:category/:subcategory/new',
    name: 'library-tasks-new',
    component: LibraryTasksNewPage,
    beforeEnter: setParamsHandler,
    meta: { title: 'Нове завдання' }
  },
  {
    path: '/library/:category/:subcategory/:taskId',
    name: 'library-a-task',
    component: LibraryTaskPage,
    beforeEnter: setParamsHandler,
    meta: { title: 'Завдання' }
  },
  {
    path: '/library/:category/:subcategory/:taskId/edit',
    name: 'library-a-task-edit',
    component: LibraryTaskEditPage,
    beforeEnter: setParamsHandler,
    meta: { title: 'Редагування завдання' }
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
