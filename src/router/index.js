import { createRouter, createWebHistory } from 'vue-router';
import Registro from '../views/Registro.vue';
import Usuarios from '../views/Usuarios.vue';
import Bienvenidos from '../views/Bienvenidos.vue';

const routes = [
  { path: '/Registro', component: Registro },
  { path: '/Usuarios', component: Usuarios },
  { path: '/Bienvenidos', component: Bienvenidos }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
