import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '../layouts/AdminLayout.vue'
import ClientLayout from '../layouts/ClientLayout.vue'
import Dashboard from '../views/admin/Dashboard.vue'
import Users from '../views/admin/Users.vue'
import Contacto from '../views/Contacto.vue'
import DetallesPlanNutricion from '../views/DetallesPlanNutricion.vue'
import Inicio from '../views/Inicio.vue'
import Login from '../views/Login.vue'
import Planes from '../views/Planes.vue'
import QueEsLongLife from '../views/QueEsLongLife.vue'
import Register from '../views/Register.vue'
import Suscripciones from '../views/VistaSuscripciones.vue'


const routes = [
  // Rutas del Cliente
  {
    path: '/',
    component: ClientLayout,
    children: [
      { path: '', name: 'inicio', component: Inicio },
      { path: '/Inicio', name: 'inicio', component: Inicio },
      { path: '/contacto', name: 'contacto', component: Contacto },
      { path: '/longlife', name: 'longlife', component: QueEsLongLife },
      { path: '/planes', name: 'planes', component: Planes },
      { path: '/suscripciones', name: 'suscripciones', component: Suscripciones },
      { path: '/detalles-plan-nutricion', name: 'detallesPlanNutricion', component: DetallesPlanNutricion },
      { path: '/login', name: 'login', component: Login },
      { path: '/register', name: 'register', component: Register },
    ]
  },

  // 📌 Rutas del Panel de Administración
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAdmin: true },
    children: [
      { path: '', name: 'admin-dashboard', component: Dashboard },
      { path: 'users', name: 'admin-users', component: Users },  // Cambié '/users' a 'users'
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🚀 Protección de rutas para admin
{
  /* 
  router.beforeEach((to, from, next) => {
  const isAdmin = localStorage.getItem('role') === 'admin';
  if (to.meta.requiresAdmin && !isAdmin) {
    next('/login');
  } else {
    next();
  }
});
  */
}


export default router
