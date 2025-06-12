import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'tailwindcss/tailwind.css';
import servicesPlugin from '../src/components/plugins/services.js';
import validatorsPlugin from '../src/components/plugins/validators';
import axios from 'axios';



router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/Login', '/Cadastro'];
  const authRequired = to.matched.some(record => record.meta.requiresAuth);
  const token = localStorage.getItem('token');

  if (authRequired && !token) {
    next('/Login');
  } else {
    next();
  }
});

const app = createApp(App)

app.use(router)
app.use(servicesPlugin);
app.use(validatorsPlugin);

app.mount('#app')
