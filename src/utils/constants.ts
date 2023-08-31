import type { Variant } from '@/types/styles'

export const RouteName = {
  HOME: 'home',
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOT_PASSWORD: 'forgot-password',
  ACCOUNT: 'account',
  NOT_FOUND: 'not-found',
  STUDENTS: 'students'
} as const

export const EARN_TYPES = [
  {
    title: 'На телефон',
    type: 'phone',
    imageSrc:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg'
  },
  {
    title: 'На мультики',
    type: 'cartoon',
    imageSrc:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg'
  },
  {
    title: 'На монети',
    type: 'coins',
    imageSrc:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/8.svg'
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
