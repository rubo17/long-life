import { createRouter, createWebHistory } from 'vue-router'
import Contacto from '../views/Contacto.vue'
import Inicio from '../views/Inicio.vue'
import Login from '../views/Login.vue'
import Planes from '../views/Planes.vue'
import QueEsLongLife from '../views/QueEsLongLife.vue'
import Suscripciones from '../views/VistaSuscripciones.vue'

const routes = [
  { path: '/Inicio', component: Inicio },
  { path: '/', component: Inicio },
  { path: '/Contacto', component: Contacto },
  { path: '/longlife', component: QueEsLongLife },
  { path: '/planes', component: Planes },
  { path: '/suscripciones', component: Suscripciones },
  { path: '/login', component: Login },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
