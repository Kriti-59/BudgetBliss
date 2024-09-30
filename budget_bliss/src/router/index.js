import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Logout from '../components/Logout.vue';

const routes = [
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/logout', component: Logout},
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
