import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    redirect: '/login'  // Redirect to login page by default
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
