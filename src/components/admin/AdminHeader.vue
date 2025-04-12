<template>
  <div class="bg-gray-800 text-white flex items-center justify-end px-8 py-6">
    <!-- Logo o Título -->

    <!-- Barra de navegación del administrador -->
    <div class="flex items-center space-x-6">
      <!-- Buscar (opcional) -->
      <div class="relative">
        <input type="text" placeholder="Buscar..."
          class="bg-gray-700 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      <!-- Icono de usuario (opcional) -->
      <div class="flex items-center space-x-2">
        <span>Bienvenido, {{ user?.nombre }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthLogin } from '../../composables/api/login/UseUserLogin';

const { user, loadUser } = useAuthLogin();
onMounted(() => {
  loadUser(); // carga el usuario desde el localStorage si está guardado
});
</script>
