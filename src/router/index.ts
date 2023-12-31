import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import routes from './routes'
import { routesGuard } from './routesGuards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes as RouteRecordRaw[]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | EduPlay`
  routesGuard(to, from, next)
})

export default router
