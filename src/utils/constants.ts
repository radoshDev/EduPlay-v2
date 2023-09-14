import type { Variant } from '@/types/styles'

export const RouteName = {
  HOME: 'home',
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOT_PASSWORD: 'forgot-password',
  ACCOUNT: 'account',
  NOT_FOUND: 'not-found',
  STUDENTS: 'students',
  STUDENT_ADD: 'student-add',
  STUDENT_UPDATE: 'student-update',
  STUDENT_INFO: 'student-info',
  EDUCATION_MENU: 'education-menu',
  EDUCATION_TASK: 'education-task',
  LIBRARY_CATEGORIES: 'library-categories',
  LIBRARY_CATEGORY_NEW: 'library-category-new',
  LIBRARY_CATEGORY_EDIT: 'library-category-edit',
  LIBRARY_SUBCATEGORIES: 'library-subcategories',
  LIBRARY_SUBCATEGORY_NEW: 'library-subcategory-new',
  LIBRARY_SUBCATEGORY_EDIT: 'library-subcategory-edit',
  LIBRARY_TASKS: 'library-tasks',
  LIBRARY_A_TASK: 'library-a-task',
  LIBRARY_A_TASK_NEW: 'library-a-task-new',
  LIBRARY_A_TASK_EDIT: 'library-a-task-edit',
  CREATURE_CATEGORIES: 'creature-categories',
  CREATURE_CATEGORY_NEW: 'creature-category-new',
  CREATURE_CATEGORY_EDIT: 'creature-category-edit',
  CREATURE_LIST: 'creature-list',
  CREATURE: 'creature',
  CREATURE_NEW: 'creature-new',
  CREATURE_EDIT: 'creature-edit'
} as const

export const EARN_TYPES = [
  {
    title: 'Математика',
    type: 'math',
    icon: 'fc-calculator'
  },
  {
    title: 'Читання',
    type: 'reading',
    icon: 'fc-reading-ebook'
  },
  {
    title: 'На монети',
    type: 'coins',
    icon: 'bi-cash-coin',
    fill: '#FBBD23'
  }
]

export const DIFFICULTY_TYPES = [
  'beginner',
  'easy',
  'normal',
  'hard',
  'expert',
  'ultra'
]

export const GRAPH_COLORS = [
  'rgba(87, 13, 248, 0.5)',
  'rgba(29, 205, 188, 0.5)',
  'rgba(29, 78, 216, 0.5)',
  'rgba(234, 88, 12, 0.5)',
  'rgba(240, 0, 184, 0.5)'
]

export const VARIANT_COLORS: Variant[] = [
  'primary',
  'secondary',
  'success',
  'warning'
]

export const GRAPH_PERIOD_OPTIONS = [
  { label: 'Тиждень', value: 'week' },
  { label: 'Місяць', value: 'month' },
  { label: 'Рік', value: 'year' }
]

export const TL_UA = {
  library: {
    category: { title: 'Категорія' },
    subcategory: { title: 'Підкатегорія' },
    task: { title: 'Завдання' }
  }
}
