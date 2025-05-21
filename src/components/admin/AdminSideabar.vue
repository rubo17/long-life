<template>
  <aside
    class="w-64 bg-[#1E293B] h-screen text-white flex flex-col py-6 px-4 overflow-auto fixed md:static inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out md:translate-x-0"
  >
    <!-- Botón cerrar en móvil -->
    <button
      @click="$emit('close')"
      class="absolute top-4 right-4 md:hidden text-white text-xl"
    >
      &times;
    </button>

    <div class="flex items-center gap-3 mb-10 mt-6 md:mt-0">
      <img src="/images/longlife.png" class="w-10 h-10 rounded-full" />
      <h2 class="font-bold text-lg">LongLife Admin</h2>
    </div>

    <nav class="space-y-4">
      <RouterLink
        @click="$emit('close')"
        v-for="item in links"
        :key="item.name"
        :to="item.to"
        class="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-700 transition"
      >
        <component :is="item.icon" class="w-5 h-5" />
        <span>{{ item.name }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>



<script setup>
import {
  BriefcaseIcon,
  ClipboardDocumentListIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  HomeIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
  StarIcon,
  UserGroupIcon,
  UsersIcon
} from '@heroicons/vue/24/outline';

const links = [
  { name: 'Dashboard', to: '/admin', icon: HomeIcon },
  { name: 'Usuarios', to: '/admin/users', icon: UsersIcon },
  { name: 'Empleados', to: '/admin/empleados', icon: BriefcaseIcon },
  { name: 'Productos', to: '/admin/products', icon: ShoppingBagIcon },
  { name: 'Categorías', to: '/admin/categoriaProductos', icon: Squares2X2Icon },
  { name: 'Ventas', to: '/admin/ventas', icon: CurrencyDollarIcon },
  { name: 'Suscripciones', to: '/admin/suscripciones', icon: CreditCardIcon },
  { name: 'Planes', to: '/admin/planes', icon: CreditCardIcon },
  { name: 'Usuarios Suscripciones', to: '/admin/usuariosSuscripciones', icon: UserGroupIcon },
  { name: 'Usuarios con Planes', to: '/admin/usuariosPlanes', icon: ClipboardDocumentListIcon },
  { name: 'Contenidos Premium', to: '/admin/contenidosPremium', icon: StarIcon },
  { name: 'Cupones', to: '/admin/cupones', icon: StarIcon },
  { name: 'Volver', to: '/' }
]
</script>
