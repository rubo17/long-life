<template>
    <div class="max-w-5xl mx-auto px-4 py-10 space-y-8">
      <h1 class="text-2xl font-bold text-green-600 text-center">Tus planes activos</h1>
  
      <div v-if="planes.length" class="grid gap-6">
        <div
          v-for="plan in planes"
          :key="plan.id"
          class="border rounded-xl p-6 bg-white shadow hover:shadow-md transition"
        >
          <h2 class="text-xl font-semibold text-gray-800">Plan ID: {{ plan.id_plan }}</h2>
          <p class="text-gray-600 mt-2">Empleado asignado: #{{ plan.id_empleado }}</p>
          <p class="text-gray-600">Inicio: {{ plan.fecha_inicio }}</p>
          <p class="text-gray-600">Fin: {{ plan.fecha_fin }}</p>
          <p class="text-green-600 font-bold mt-2">Estado: {{ plan.status }}</p>
        </div>
      </div>
  
      <div v-else class="text-center text-gray-500">
        Aún no tienes planes activos.
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue'
import api from '../api/axios'
  
  const planes = ref<any>([])
  const storedUser = localStorage.getItem('user')
  const user = storedUser ? JSON.parse(storedUser) : null
  const userId = user?.id_usuario ?? null
  
  onMounted(async () => {
    if (!userId) return
  
    try {
      const res = await api.get(`/usuarios/${userId}/planes-activos`)
      planes.value = res.data
    } catch (err) {
      console.error('Error cargando planes activos:', err)
    }
  })
  </script>
  