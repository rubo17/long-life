<template>
  <div class="container mx-auto py-6 px-4">
    <h1 class="text-2xl text-center font-bold mb-6">Mis cupones</h1>

    <div v-if="cupones.length === 0" class="text-center text-lg text-gray-500">No hay cupones disponibles actualmente.</div>

    <div v-else class="grid gap-4">
      <div
        v-for="cupon in cupones"
        :key="cupon.id"
        class="p-4  rounded-xl shadow-sm bg-white transition hover:shadow-md"
      >
        <h2 class="text-base sm:text-lg font-semibold text-blue-600 mb-1">Código: {{ cupon.codigo }}</h2>
        <p class="text-sm text-gray-700">{{ cupon.descripcion }}</p>
        <p class="text-sm mt-2 text-green-600 font-medium">
          {{ cupon.tipo_descuento === 'porcentaje' ? cupon.descuento + '%' : cupon.descuento + '€' }} de descuento
        </p>
        <p class="text-xs text-gray-500 mt-1">Válido hasta: {{ cupon.valido_hasta }}</p>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue'
import api from '../api/axios'

const cupones = ref<any[]>([])

const user = JSON.parse(localStorage.getItem('user') || '{}')
const userId = user.id_usuario

onMounted(async () => {
  try {
    const response = await api.get(`/usuarios/${userId}/cupones`)
    cupones.value = response.data
  } catch (error) {
    console.error('Error al obtener cupones:', error)
  }
})
</script>
