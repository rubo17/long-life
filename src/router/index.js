import { createRouter, createWebHistory } from 'vue-router'
import Contacto from '../views/Contacto.vue'
import Inicio from '../views/Inicio.vue'
import QueEsLongLife from '../views/QueEsLongLife.vue'


const routes = [
  { path: '/Inicio', component: Inicio },
  { path: '/', component: Inicio },
  { path: '/Contacto', component: Contacto },
  { path: '/longlife', component: QueEsLongLife },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
