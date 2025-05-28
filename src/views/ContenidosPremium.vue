<template>
    <div class="container mx-auto py-8">
      <div class="flex gap-4 justify-center items-center">
        <RouterLink to="/perfil" class="flex items-center gap-2 text-blue-600 hover:underline mb-4">
          <FlechaAtras class="w-6 h-6" />
        </RouterLink>
        <h1 class="text-xl sm:text-3xl font-bold mb-6 text-center">📚 Contenidos Premium</h1>
      </div>
  
      <div v-if="contenidos.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="contenido in contenidos"
          :key="contenido.id"
          class="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition duration-300"
        >
          <h2 class="text-xl font-semibold mb-2 text-gray-800">{{ contenido.titulo }}</h2>
          <p class="text-gray-600 text-sm mb-4">{{ contenido.descripcion }}</p>
          <p class="text-xs text-gray-400 mb-4">📅 Publicado: {{ contenido.fecha_publicacion }}</p>
  
          <a
            :href="BASE_URL + '/' + contenido.archivo_url"
            target="_blank"
            class="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition"
          >
            📥 Ver / Descargar PDF
          </a>
        </div>
      </div>
  
      <div v-else class="text-center text-gray-500 mt-10">
        <p>No hay contenidos disponibles por ahora.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
import api from '../api/axios';
import FlechaAtras from '../components/icons/FlechaAtras.vue';
  const contenidos = ref([]);
  const BASE_URL = import.meta.env.VITE_API_URL; 
  
onMounted(async () => {
  const token = localStorage.getItem('token')

  try {
    const res = await api.get('/contenidoPremiumUsuario', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    contenidos.value = res.data.data ?? []
    console.log(contenidos.value)
  } catch (err) {
    console.error('Error cargando los contenidos:', err)
  }
})

  </script>
  