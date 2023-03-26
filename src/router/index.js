import { createRouter, createWebHistory } from 'vue-router'
import HomeView from 'views/HomeView.vue'
import NotFoundView from 'views/NotFoundView.vue'

/**
 * 静态路由配置
 * {
 *  path: string,//地址
 *  component: {},//组件
 *  name: string,//路由名称
 *  icon: string,//菜单图标,仅一级菜单生效
 *  noAuth: boolean,//不需要权限
 *  title: string,//路由标题
 *  notMenu: boolean//不是菜单
 * }
 * @returns 静态路由配置
 */
export const getRouteConfig = () => [
  {
    name: 'Home',
    title: '首页',
    path: '/',
    icon: '&#xe6cb;',
    component: HomeView,
    noAuth: true,
    notMenu: true,
  },
  {
    name: 'Order',
    title: '订单管理',
    path: '/order',
    icon: '&#xe615;',
    component: () => import('views/OrderView.vue'),
  },
  {
    name: 'Lawyer',
    title: '律师管理',
    path: '/lawyer',
    icon: '&#xe6ed;',
    component: () => import('views/LawyerView/IndexView.vue'),
  },
  {
    name: 'Customer',
    title: '客户管理',
    path: '/customer',
    icon: '&#xe634;',
    component: () => import('views/CustomerView.vue'),
  },
  {
    name: 'Comment',
    title: '评价管理',
    path: '/comment',
    icon: '&#xe634;',
    component: () => import('views/CommentView.vue'),
  },
  {
    name: 'Profile',
    title: '个人中心',
    path: '/profile',
    component: () => import('views/ProfileView.vue'),
    noAuth: true,
    notMenu: true,
  },
  {
    name: 'NotFound',
    title: '无效地址',
    path: '/:pathMatch(.*)*',
    component: NotFoundView,
    icon: '&#xe6cb;',
    noAuth: true,
    notMenu: true,
  },
]

const extractRoute = (routes, curr, prev = { name: '', path: '', title: '' }) => {
  const { component, children, meta = {} } = curr
  const next = {
    name: prev.name === '' ? curr.name : prev.name + '-' + curr.name,
    path: prev.path + curr.path,
    title: prev.title === '' ? curr.title : prev.title + '-' + curr.title,
  }
  if (component) {
    if (children && children.length > 0) {
      throw new Error('Route configuration error')
    }
    meta.title = next.title
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
