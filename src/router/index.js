import { createRouter, createWebHistory } from 'vue-router'
import HomeView from 'views/HomeView.vue'
import NotFoundView from 'views/NotFoundView.vue'

export const getRouteConfig = () => [
  {
    name: 'Home',
    title: '首页',
    path: '/',
    component: HomeView,
    meta: {
      always: true,
    },
  },
  {
    name: 'Order',
    title: '订单管理',
    path: '/order',
    component: () => import('views/OrderView.vue'),
  },
  {
    name: 'Lawyer',
    title: '律师管理',
    path: '/lawyer',
    component: () => import('views/LawyerView.vue'),
  },
  {
    name: 'Customer',
    title: '客户管理',
    path: '/customer',
    component: () => import('views/CustomerView.vue'),
  },
  {
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    component: NotFoundView,
    meta: {
      always: true,
    },
  },
]

const extractRoute = (routes, curr, prev = { name: '', path: '' }) => {
  const { component, children, meta } = curr
  const next = {
    name: prev.name === '' ? curr.name : prev.name + '-' + curr.name,
    path: prev.path + curr.path,
  }
  if (component) {
    if (children && children.length > 0) {
      throw new Error('Route configuration error')
    }
    routes.push({ ...next, component, meta })
  } else {
    if (!children || children.length === 0) {
      throw new Error('Route configuration error')
    }
    children.forEach((child) => extractRoute(routes, child, next))
  }
}

const routes = getRouteConfig().reduce((routes, meta) => {
  extractRoute(routes, meta)
  return routes
}, [])

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
