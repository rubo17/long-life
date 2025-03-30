<template>
    <div class="container mx-auto p-6">
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
    
  <script setup>
  import axios from 'axios';
import { onMounted, ref } from 'vue';
  
  const users = ref([]);   // Aquí se almacenarán los usuarios
  const loading = ref(true); // Estado de carga
  const error = ref(false);  // Estado de error
  
  // Función para obtener los usuarios desde el backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost/longLifeBack/public/users');
      users.value = response.data; // Asignamos los usuarios a la variable 'users'
    } catch (err) {
      console.error('Error al obtener los usuarios:', err);
      error.value = true; // Si ocurre un error, establecemos 'error' a true
    } finally {
      loading.value = false; // Al finalizar, cambiamos el estado de carga
    }
  };
  
  // Llamamos a la función 'fetchUsers' cuando el componente se monta
  onMounted(fetchUsers);
  </script>
  