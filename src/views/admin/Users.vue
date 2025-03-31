<template>
  <div class="container border mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Lista de Usuarios</h1>

    <!-- Estado de carga -->
    <div v-if="loading" class="text-gray-600">Cargando usuarios...</div>

    <!-- Mensaje de error -->
    <div v-if="error" class="text-red-500">Error al cargar los usuarios.</div>

    <!-- Lista de usuarios -->
    <ul v-if="users.length" class="bg-white shadow-md rounded-lg p-4">
      <li v-for="user in users" :key="user.id_usuario" class="border-b p-2 last:border-none">
        <span class="font-semibold">{{ user.nombre }}</span> -
        <span class="text-gray-500">{{ user.email }}</span>
      </li>
    </ul>

    <!-- Mensaje si no hay usuarios -->
    <p v-if="!loading && !error && users.length === 0" class="text-gray-500">No hay usuarios disponibles.</p>
  </div>
</template>
 
<script setup lang="ts">
  import axios from 'axios';
import { onMounted, ref } from 'vue';

  interface User {
    id_usuario: string;
    nombre: string;
    email: string;
    password: string;
    rol: string;
    id_suscripcion: string;
  }

  const users = ref < User[] > ([]);  
  const loading = ref < boolean > (true);
  const error = ref < boolean > (false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get < User[] > ('http://localhost/longLifeBack/public/users');
      users.value = response.data;
    } catch (err) {
      error.value = true;
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchUsers();
  });

</script>