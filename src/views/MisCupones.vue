<template>
  <div class="container mx-auto py-6 px-4">
    <RouterLink class="flex justify-center items-center gap-3 " to="/perfil">
      <FlechaAtras class="w-8 h-8 text-blue-500"/>
      <h1 class="text-2xl font-bold">Mis cupones</h1>
    </RouterLink>

    <div v-if="cupones.length === 0" class="text-center text-lg mt-4 text-gray-500">
      No hay cupones disponibles actualmente.
    </div>

    <div v-else class="grid gap-4">
      <div
        v-for="cupon in cupones"
        :key="cupon.id"
        class="p-4 rounded-xl shadow-sm bg-white transition hover:shadow-md relative"
      >
        <h2 class="text-base sm:text-lg font-semibold text-blue-600 mb-1">
          Código: {{ cupon.codigo }}
        </h2>
        <p class="text-sm text-gray-700">{{ cupon.descripcion }}</p>
        <p class="text-sm mt-2 text-green-600 font-medium">
          {{ cupon.tipo_descuento === 'porcentaje' ? cupon.descuento + '%' : cupon.descuento + '€' }} de descuento
        </p>
        <p class="text-xs text-gray-500 mt-1">Válido hasta: {{ cupon.valido_hasta }}</p>

        <!-- Botón de copiar -->
        <CopiarButton class="absolute w-8 h-8 bottom-4 right-4 text-sm text-blue-500 transition hover:scale-105 cursor-pointer " @click="copiarAlPortapapeles(cupon.codigo)"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { notify } from '@kyvg/vue3-notification'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import api from '../api/axios'
import CopiarButton from '../components/icons/CopiarButton.vue'
import FlechaAtras from '../components/icons/FlechaAtras.vue'

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

function copiarAlPortapapeles(texto: string) {
  navigator.clipboard.writeText(texto)
    .then(() => {
        notify({ type: 'success', title: 'Copiado en el portapapeles' })
    })
    .catch(err => {
        notify({ type: 'error', title: 'Error al copiar en el portapapeles' })
    })
}
</script>
