import { jwtDecode } from 'jwt-decode'
import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '../layouts/AdminLayout.vue'
import ClientLayout from '../layouts/ClientLayout.vue'
import FinalizarCompra from '../layouts/FinalizarCompra.vue'
import ContenidosPremiumAdmin from '../views/admin/ContenidosPremiumAdmin.vue'
import Dashboard from '../views/admin/Dashboard.vue'
import Products from '../views/admin/Products.vue'
import SuscripcionesUsuario from '../views/admin/SuscripcionesUsuario.vue'
import Users from '../views/admin/Users.vue'
import Ventas from '../views/admin/Ventas.vue'
import Blog from '../views/Blog.vue'
import Carrito from '../views/Carrito.vue'
import CheckoutSuscripcion from '../views/CheckoutSuscripcion.vue'
import Contacto from '../views/Contacto.vue'
import ContenidosPremium from '../views/ContenidosPremium.vue'
import DetallesPlanNutricion from '../views/DetallesPlanNutricion.vue'
import Direccion from '../views/Direccion.vue'
import ForgotPasswsord from '../views/ForgotPasswsord.vue'
import Inicio from '../views/Inicio.vue'
import Login from '../views/Login.vue'
import Pago from '../views/Pago.vue'
import Pedidos from '../views/Pedidos.vue'
import Perfil from '../views/perfil.vue'
import Planes from '../views/Planes.vue'
import ProductDetail from '../views/ProductDetail.vue'
import QueEsLongLife from '../views/QueEsLongLife.vue'
import Register from '../views/register.vue'
import ResetPassword from '../views/ResetPassword.vue'
import ResultadosEstudio from '../views/ResultadosEstudio.vue'
import Succes from '../views/Succes.vue'
import SuscripcionSucces from '../views/SuscripcionSucces.vue'
import Tienda from '../views/Tienda.vue'
import VistaSuscripciones from '../views/VistaSuscripciones.vue'
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
      { path: '/suscripciones', name: 'vistaSuscripciones', component: VistaSuscripciones },
      { path: '/detalles-plan-nutricion', name: 'detallesPlanNutricion', component: DetallesPlanNutricion },
      { path: '/login', name: 'login', component: Login },
      { path: '/register', name: 'register', component: Register },
      { path: '/perfil', name: 'perfil', component: Perfil, meta: {requiresAuth: true} },
      { path: '/pedidos', name: 'pedidos', component: Pedidos, meta: {requiresAuth: true} },
      { path: '/contenidosPremium', name: 'contenidosPremium', component: ContenidosPremium, meta: { requiresAuth: true, requiresPremium: true }},
      { path: '/forgotPassword', name: 'forgotPassword', component: ForgotPasswsord },
      { path: '/resetPassword/:token', name: 'resetPassword', component: ResetPassword },
      { path: '/CheckoutSuscripcion', name: 'CheckoutSuscripcion', component: CheckoutSuscripcion },
      { path: '/suscripcion/success', name: 'succesSuscrtipcion', component: SuscripcionSucces },
      { path: '/misMediciones', name: 'misMediciones', component: ResultadosEstudio, meta: { requiresAuth: true, requiresPremium: true } },
      { path: '/blog', name: 'blog', component: Blog },
    ]
  },
  {
    path:'/finalizarCompra',
    component:FinalizarCompra,
    children: [
      { path: '', redirect: { name: 'direccion' } }, 
      { path: 'direccion', name: 'direccion', component: Direccion },
      { path: 'pago', name: 'pago', component: Pago },
      { path: 'succes', name: 'succes', component: Succes },
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
      { path: 'ventas', name: 'admin-ventas', component: Ventas },  
      { path: 'suscripciones', name: 'admin-suscripciones', component: SuscripcionesUsuario },  
      { path: 'contenidosPremium', name: 'admin-contenidosPremium', component: ContenidosPremiumAdmin },  
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

      if (to.meta.requiresPremium && !decoded.esPremium) {
        return next('/');
      }

      // ✅ Usuario autenticado y autorizado
      return next();
    } catch (err) {
      localStorage.clear();
      return next('/login');
    }
  }
  if (
    to.path.startsWith('/finalizarCompra')  // protege todo lo que empiece por /finalizarCompra
  ) {
    const carrito = JSON.parse(localStorage.getItem('productsInCart') || '[]')
    if (!carrito.length) return next('/') // o donde quieras redirigir
  }
  return next();
});



export default router
