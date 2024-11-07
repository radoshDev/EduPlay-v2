import { useUserStore } from '@/stores/user/userStore'
import { RouteName } from '@/utils/constants'
import type { NavigationGuard } from 'vue-router'

export const routesGuard: NavigationGuard = (to, from, next) => {
  const userStore = useUserStore()
  const authRegexp = /^\/((?!register|login|education\/unknown\/coins).{1,})/g
  const isAuthRequired = !userStore.user && authRegexp.test(to.path)
  const isNotAuthRequired = userStore.user && !authRegexp.test(to.path)
  const isAdminRequired =
    !userStore.user?.isAdmin && /.+\/(new|edit)$/.test(to.path)

  if (isAuthRequired) {
    next({ name: RouteName.LOGIN })
    return
  }

  if (isNotAuthRequired) {
    const lastStudentId = localStorage.getItem('studentId')
    const primaryStudentId = localStorage.getItem('primaryStudentId')
    const studentId = primaryStudentId || lastStudentId
    const path = studentId ? `/education/${studentId}` : '/students'
    next(path)
    return
  }

  if (isAdminRequired) {
    next({ path: '/404' })
    return
  }

  next()
}
