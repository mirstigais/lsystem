import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/visualizer',
      component: () => import('@views/Visualizer.vue'),
    },
    {
      path: '/about',
      component: () => import('@views/About.vue'),
    },
    {
      path: '/credits',
      component: () => import('@views/Credits.vue'),
    },
  ],
})