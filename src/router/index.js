import { createRouter, createWebHistory } from 'vue-router'
import HomeView from 'views/HomeView.vue'
import NotFoundView from 'views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      title: '首页',
      isMenu: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
