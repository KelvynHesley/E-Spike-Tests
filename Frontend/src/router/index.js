import { createRouter, createWebHistory } from 'vue-router';
import CadastroView from '../views/CadastroView.vue';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import MapView from '../views/MapView.vue';
import MenuView from "@/views/MenuView.vue";
import SComportmentView from "@/views/SComportmentView.vue";
import AboutVieww from '../views/AboutVieww.vue';
import ChangeView from '../views/ChangeView.vue';
import FeaturesView from '../views/FeaturesView.vue';
import TermsView from '../views/TermsView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Cadastro',
    name: 'Cadastro',
    component: CadastroView
  },
  {
    path: '/Login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/Mapa',
    name: 'Mapa',
    component: MapView,
    meta: { requiresAuth: true }
  },
  {
    path: '/Menu',
    name: 'Menu',
    component: MenuView
  },
  {
    path: '/Suspect',
    name: 'Suspect',
    component: SComportmentView
  },
  {
    path: '/About',
    name: 'About',
    component: AboutVieww
  },
  {
    path: '/Terms',
    name: 'Terms',
    component: TermsView
  },
  {
    path: '/Features',
    name: 'Features',
    component: FeaturesView
  },
  {
    path: '/Change',
    name: 'Change',
    component: ChangeView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token');
    if (!token) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
