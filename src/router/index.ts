import { jwtDecode } from 'jwt-decode'
import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '../layouts/AdminLayout.vue'
import ClientLayout from '../layouts/ClientLayout.vue'
import FinalizarCompra from '../layouts/FinalizarCompra.vue'
import Dashboard from '../views/admin/Dashboard.vue'
import Products from '../views/admin/Products.vue'
import Users from '../views/admin/Users.vue'
import Carrito from '../views/Carrito.vue'
import Contacto from '../views/Contacto.vue'
import DetallesPlanNutricion from '../views/DetallesPlanNutricion.vue'
import ForgotPasswsord from '../views/ForgotPasswsord.vue'
import Inicio from '../views/Inicio.vue'
import Login from '../views/Login.vue'
import Perfil from '../views/perfil.vue'
import Planes from '../views/Planes.vue'
import ProductDetail from '../views/ProductDetail.vue'
import QueEsLongLife from '../views/QueEsLongLife.vue'
import Register from '../views/register.vue'
import ResetPassword from '../views/ResetPassword.vue'
import Tienda from '../views/Tienda.vue'
import Suscripciones from '../views/VistaSuscripciones.vue'
const routes = [
  // Rutas del Cliente
  {
    path: '/',
    component: ClientLayout,
    children: [
      { path: '', name: 'inicio', component: Inicio },
      { path: '/contacto', name: 'contacto', component: Contacto },
      { path: '/longlife', name: 'longlife', component: QueEsLongLife },
      { path: '/planes', name: 'planes', component: Planes },
      { path: '/tienda', name: 'tienda', component: Tienda },
      { path: '/carrito', name: 'carrito', component: Carrito, meta: {requiresAuth: true} },
      { path: '/tienda/product/:id', name: 'productDetail', component: ProductDetail },
      { path: '/suscripciones', name: 'suscripciones', component: Suscripciones },
      { path: '/detalles-plan-nutricion', name: 'detallesPlanNutricion', component: DetallesPlanNutricion },
      { path: '/login', name: 'login', component: Login },
      { path: '/register', name: 'register', component: Register },
      { path: '/perfil', name: 'perfil', component: Perfil },
      { path: '/forgotPassword', name: 'forgotPassword', component: ForgotPasswsord },
      { path: '/resetPassword/:token', name: 'resetPassword', component: ResetPassword },
    ]
  },
  {
    path:'/finalizarCompra',
    component:FinalizarCompra,
    children: [
    ]

  },
  // 📌 Rutas del Panel de Administración
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true }, // <-- Aquí
    children: [
      { path: '', name: 'admin-dashboard', component: Dashboard },
      { path: 'users', name: 'admin-users', component: Users },  
      { path: 'products', name: 'admin-products', component: Products },  
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🚀 Protección de rutas para admin
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth) {
    if (!token) return next('/login');

    try {
      const decoded: any = jwtDecode(token);
      const now = Date.now() / 1000;

      // Token expirado
      if (decoded.exp < now) {
        localStorage.clear();
        return next('/login');
      }

      // Solo admins a rutas protegidas con requiresAdmin
      if (to.meta.requiresAdmin && decoded.rol !== '1') {
        return next('/');
      }

      // ✅ Usuario autenticado y autorizado
      return next();
    } catch (err) {
      localStorage.clear();
      return next('/login');
    }
  }

  return next();
});



export default router
