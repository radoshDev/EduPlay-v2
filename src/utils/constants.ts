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
  STUDENT_INFO: 'student-info',
  EDUCATION_MENU: 'education-menu'
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
