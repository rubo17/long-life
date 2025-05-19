<template>
  <div class="bg-gray-800 text-white flex items-center justify-end px-8 py-6">
    <!-- Barra de navegación del administrador -->
    <div class="flex items-center space-x-6">
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
