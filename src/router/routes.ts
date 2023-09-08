import type { ValueOf } from '@/types'
import type { RouteName } from '@/utils/constants'
import type { RouteRecordRaw } from 'vue-router'
import { setParamsHandler } from './routeHandlers'

export type RouteRecord = Omit<RouteRecordRaw, 'name'> & {
  name: ValueOf<typeof RouteName>
}

const routes: RouteRecord[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
    meta: { title: 'Головна' }
  },
  {
    path: '/students',
    name: 'students',
    component: () => import('@/pages/students/StudentsPage.vue'),
    meta: { title: 'Студенти' }
  },
  {
    path: '/students/add',
    name: 'student-add',
    component: () => import('@/pages/students/AddStudentPage.vue'),
    meta: { title: 'Новий студент' }
  },
  {
    path: '/students/:studentId',
    name: 'student-info',
    component: () => import('@/pages/students/StudentInfoPage.vue'),
    beforeEnter: setParamsHandler,
    meta: { title: 'Дані студента' }
  },
  {
    path: '/students/:studentId/update',
    name: 'student-update',
    component: () => import('@/pages/students/UpdateStudentPage.vue'),
    beforeEnter: setParamsHandler,
    meta: { title: 'Редагування Студента' }
  },
  {
    path: '/education/:studentId',
    name: 'education-menu',
    component: () => import('@/pages/education/EducationMenuPage.vue'),
    beforeEnter: setParamsHandler,
    meta: { title: 'Список завдань' }
  },
  {
    path: '/education/:studentId/:taskType',
    name: 'education-task',
    component: () => import('@/pages/education/EducationTaskPage.vue'),
    beforeEnter: setParamsHandler,
    meta: { title: 'Завдання' }
  },
  {
    path: '/library',
    name: 'library-categories',
    component: () => import('@/pages/library/LibraryCategoriesPage.vue'),
    meta: { title: 'Категорії' }
  },
  {
    path: '/library/new',
    name: 'library-categories-new',
    component: () => import('@/pages/library/LibraryCategoriesNewPage.vue'),
    meta: { title: 'Нова категорія' }
  },
  {
    path: '/library/:category',
    name: 'library-subcategories',
    component: () => import('@/pages/library/LibrarySubcategoriesPage.vue'),
    beforeEnter: setParamsHandler,
    meta: { title: 'Підкатегорії' }
  },
  {
    path: '/library/:category/new',
    name: 'library-subcategories-new',
    component: () => import('@/pages/library/LibrarySubcategoriesNewPage.vue'),
    beforeEnter: setParamsHandler,
    meta: { title: 'Нова підкатегорія' }
  },
  {
    path: '/library/:category/:subcategory',
    name: 'library-tasks',
    component: () => import('@/pages/library/LibraryTasksPage.vue'),
    beforeEnter: setParamsHandler,
    meta: { title: 'Завдання' }
  },
  {
    path: '/library/:category/:subcategory/new',
    name: 'library-tasks-new',
    component: () => import('@/pages/library/LibraryTasksNewPage.vue'),
    beforeEnter: setParamsHandler,
    meta: { title: 'Нове завдання' }
  },
  {
    path: '/library/:category/:subcategory/:taskId',
    name: 'library-a-task',
    component: () => import('@/pages/library/LibraryTaskPage.vue'),
    beforeEnter: setParamsHandler,
    meta: { title: 'Завдання' }
  },
  {
    path: '/library/:category/:subcategory/:taskId/edit',
    name: 'library-a-task-edit',
    component: () => import('@/pages/library/LibraryTaskEditPage.vue'),
    beforeEnter: setParamsHandler,
    meta: { title: 'Редагування завдання' }
  },
  {
    path: '/creatures',
    name: 'creature-categories',
    component: () => import('@/pages/creatures/CreaturesCategoriesPage.vue'),
    meta: { title: 'Категорії істот' }
  },
  {
    path: '/creatures/new',
    name: 'creature-category-new',
    component: () => import('@/pages/creatures/CreaturesCategoryNewPage.vue'),
    meta: { title: 'Нова категорія' }
  },
  {
    path: '/creatures/edit',
    name: 'creature-category-edit',
    component: () => import('@/pages/creatures/CreaturesCategoryEditPage.vue'),
    meta: { title: 'Редагування категорії' }
  },
  {
    path: '/creatures/:categorySlug',
    name: 'creature-list',
    component: () => import('@/pages/creatures/CreaturesListPage.vue'),
    beforeEnter: setParamsHandler,
    meta: { title: 'Список істот' }
  },
  {
    path: '/creatures/:categorySlug/:creatureSlug',
    name: 'creature',
    component: () => import('@/pages/creatures/CreaturePage.vue'),
    beforeEnter: setParamsHandler,
    meta: { title: 'Деталі про істоту' }
  },
  {
    path: '/creatures/:categorySlug/new',
    name: 'creature-new',
    component: () => import('@/pages/creatures/CreatureNewPage.vue'),
    beforeEnter: setParamsHandler,
    meta: { title: 'Нова істота' }
  },
  {
    path: '/creatures/:categorySlug/:creatureSlug/edit',
    name: 'creature-edit',
    component: () => import('@/pages/creatures/CreatureEditPage.vue'),
    beforeEnter: setParamsHandler,
    meta: { title: 'Редагування істоти' }
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/pages/AccountPage.vue'),
    meta: { title: 'Обліковий запис' }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/auth/LoginPage.vue'),
    meta: { title: 'Логін' }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/pages/auth/RegisterPage.vue'),
    meta: { title: 'Реєстрація' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: { title: '404' }
  }
]

export default routes
