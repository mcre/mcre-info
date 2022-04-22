import { createRouter, createWebHistory } from 'vue-router'
import { trackRouter } from 'vue-gtag-next'

const Home = () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue')

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

if (process.env.NODE_ENV === 'production') {
  trackRouter(router)
}

export default router
