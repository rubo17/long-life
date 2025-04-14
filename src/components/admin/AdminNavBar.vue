<template>
    <header class="bg-white dark:bg-[#1E293B] px-6 py-4 shadow flex items-center justify-between">
      <h1 class="text-xl font-semibold text-gray-800 dark:text-white">Panel de Administración</h1>
      <div class="flex items-center gap-4">
        <input
          type="text"
          placeholder="Buscar..."
          class="bg-gray-100 dark:bg-gray-700 text-sm px-4 py-2 rounded-full outline-none"
        />
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
  