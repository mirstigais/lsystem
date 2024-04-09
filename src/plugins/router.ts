import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/lsystem/visualizer',
      component: () => import('@views/Visualizer.vue'),
    },
    {
      path: '/lsystem/about',
      component: () => import('@views/About.vue'),
    },
    {
      path: '/lsystem/credits',
      component: () => import('@views/Credits.vue'),
    },
  ],
})