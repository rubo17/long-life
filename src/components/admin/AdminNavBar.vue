<template>
  <header class="bg-white dark:bg-[#1E293B] px-6 py-4 shadow flex items-center justify-between">
    <!-- Botón hamburguesa solo en móvil -->
    <button @click="$emit('toggleSidebar')" class="md:hidden text-gray-700 dark:text-white">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <h1 class="hidden md:block text-xl font-semibold text-gray-800 dark:text-white">Panel de Administración</h1>
    <div class="flex items-center gap-4">

      <span class="text-sm text-gray-700 dark:text-white">Hola, {{ user?.nombre }}</span>
    </div>
  </header>
</template>
  
  <script setup>
  import { onMounted } from 'vue'
import { useAuthLogin } from '../../composables/api/login/UseUserLogin'
  
  const { user, loadUser } = useAuthLogin()
  onMounted(loadUser)
  </script>
  