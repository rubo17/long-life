<template>
  <aside class="w-64 bg-[#1E293B] text-white flex flex-col py-6 px-4">
    <div class="flex items-center gap-3 mb-10">
      <img src="/images/longlife.png" class="w-10 h-10 rounded-full" />
      <h2 class="font-bold text-lg">LongLife Admin</h2>
    </div>
    <nav class="space-y-4">
      <RouterLink v-for="item in links" :key="item.name" :to="item.to"
        class="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-700 transition">
        <component :is="item.icon" class="w-5 h-5" />
        <span>{{ item.name }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup>
import {
  BookmarkIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  HomeIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
  UsersIcon
} from '@heroicons/vue/24/outline';

const links = [
  { name: 'Dashboard', to: '/admin', icon: HomeIcon },
  { name: 'Usuarios', to: '/admin/users', icon: UsersIcon },
  { name: 'Productos', to: '/admin/products', icon: ShoppingBagIcon },
{ name: 'Categorías', to: '/admin/categoriaProductos', icon: Squares2X2Icon },
  { name: 'Ventas', to: '/admin/ventas', icon:CurrencyDollarIcon  },
  { name: 'Suscripciones', to: '/admin/suscripciones', icon:CreditCardIcon  },
  { name: 'Contenidos Premium', to: '/admin/contenidosPremium', icon:BookmarkIcon   },
  { name: 'Volver', to: '/' }
]
</script>
