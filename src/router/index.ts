import { jwtDecode } from 'jwt-decode'
import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '../layouts/AdminLayout.vue'
import ClientLayout from '../layouts/ClientLayout.vue'
import FinalizarCompra from '../layouts/FinalizarCompra.vue'
import CategoriaProductos from '../views/admin/CategoriaProductos.vue'
import ContenidosPremiumAdmin from '../views/admin/ContenidosPremiumAdmin.vue'
import Dashboard from '../views/admin/Dashboard.vue'
import Products from '../views/admin/Products.vue'
import Suscripciones from '../views/admin/Suscripciones.vue'
import SuscripcionesUsuario from '../views/admin/SuscripcionesUsuario.vue'
import Users from '../views/admin/Users.vue'
import Ventas from '../views/admin/Ventas.vue'
import Blog from '../views/Blog.vue'
import Carrito from '../views/Carrito.vue'
import ClientesEmpleado from '../views/clientesEmpleado.vue'
import ConseguirPlan from '../views/ConseguirPlan.vue'
import Contacto from '../views/Contacto.vue'
import ContenidosPremium from '../views/ContenidosPremium.vue'
import DetallesPlanEntrenamiento from '../views/DetallesPlanEntrenamiento.vue'
import DetallesPlanNutricion from '../views/DetallesPlanNutricion.vue'
import Direccion from '../views/Direccion.vue'
import ForgotPasswsord from '../views/ForgotPasswsord.vue'
import InfoSuscripcion from '../views/InfoSuscripcion.vue'
import Inicio from '../views/Inicio.vue'
import Login from '../views/Login.vue'
import MisCitasEmpleado from '../views/misCitasEmpleado.vue'
import Pago from '../views/Pago.vue'
import Pedidos from '../views/Pedidos.vue'
import Perfil from '../views/perfil.vue'
import Planes from '../views/Planes.vue'
import PlanesActivos from '../views/PlanesActivos.vue'
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
      { path: '/carrito', name: 'carrito', component: Carrito, meta: { requiresAuth: true } },
      { path: '/tienda/product/:id', name: 'productDetail', component: ProductDetail },
      { path: '/suscripciones', name: 'vistaSuscripciones', component: VistaSuscripciones },
      { path: '/detalles-plan-nutricion', name: 'detallesPlanNutricion', component: DetallesPlanNutricion },
      { path: '/detalles-plan-entrenamiento', name: 'detallesPlanEntrenamiento', component: DetallesPlanEntrenamiento },
      { path: '/login', name: 'login', component: Login },
      { path: '/register', name: 'register', component: Register },
      { path: '/perfil', name: 'perfil', component: Perfil, meta: { requiresAuth: true } },
      { path: '/pedidos', name: 'pedidos', component: Pedidos, meta: { requiresAuth: true } },
      { path: '/contenidosPremium', name: 'contenidosPremium', component: ContenidosPremium, meta: { requiresAuth: true, requiresPremium: true } },
      { path: '/forgotPassword', name: 'forgotPassword', component: ForgotPasswsord },
      { path: '/resetPassword/:token', name: 'resetPassword', component: ResetPassword },
      { path: '/suscripcion/success', name: 'succesSuscrtipcion', component: SuscripcionSucces },
      { path: '/misMediciones', name: 'misMediciones', component: ResultadosEstudio, meta: { requiresAuth: true, requiresPremium: true } },
      { path: '/blog', name: 'blog', component: Blog },
      { path: '/conseguirPlan', name: 'conseguirPlan', component: ConseguirPlan, meta: { requiresAuth: true }},
      { path: '/mis-planes', name: 'misPlanes', component: PlanesActivos },
      { path: '/clientesEmpleado', name: 'clientesEmpleado', component: ClientesEmpleado },
      { path: '/misCitas', name: 'misCitas', component: MisCitasEmpleado },
      { path: '/infoSuscripcion', name: 'infoSuscripcion', component: InfoSuscripcion, meta: { requiresAuth: true,requiresPremium: true }},

    ]
  },
  {
    path: '/finalizarCompra',
    component: FinalizarCompra,
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
    meta: { requiresAuth: true, requiresAdmin: true }, 
    children: [
      { path: '', name: 'admin-dashboard', component: Dashboard },
      { path: 'users', name: 'admin-users', component: Users },
      { path: 'products', name: 'admin-products', component: Products },
      { path: 'ventas', name: 'admin-ventas', component: Ventas },
      { path: 'usuariosSuscripciones', name: 'admin-usuariosSuscripciones', component: SuscripcionesUsuario },
      { path: 'suscripciones', name: 'admin-suscripciones', component: Suscripciones },
      { path: 'contenidosPremium', name: 'admin-contenidosPremium', component: ContenidosPremiumAdmin },
      { path: 'categoriaProductos', name: 'admin-categorias', component: CategoriaProductos },
    ]
  }
]


const router = createRouter({ history: createWebHistory(), routes, scrollBehavior(to, from, savedPosition) { return { top: 0 }; }, });

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

      if (to.meta.requiresAdmin && decoded.rol !== '1') {
        return next('/');
      }

      if (to.meta.requiresPremium && !decoded.esPremium) {
        return next('/');
      }

      return next();
    } catch (err) {
      localStorage.clear();
      return next('/login');
    }
  }
  if (
    to.path.startsWith('/finalizarCompra')
  ) {
    const carrito = JSON.parse(localStorage.getItem('productsInCart') || '[]')
    if (!carrito.length) return next('/') 
  }
  return next();
});



export default router
