import { createRouter, createWebHistory } from 'vue-router'
import HomeView from 'views/Home.vue'
import NotFoundView from 'views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
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
