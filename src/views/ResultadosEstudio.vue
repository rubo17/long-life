<template>
  <div class="container mx-auto min-h-screen p-4 sm:p-6 space-y-10">
    <h1 class="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-6">
      Resultados Corporales
    </h1>

    <div v-if="loading" class="text-center text-gray-600">Cargando mediciones...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>

    <div v-else-if="estudios.length" class="space-y-4">
      <p class="text-base sm:text-lg text-gray-600 text-center">
        {{ nombreUsuario }} de {{ edad }} años ha realizado {{ pagination.total }} estudios corporales.
      </p>

      <div class="overflow-x-auto rounded-md shadow bg-white">
        <table class="w-full mt-4 table-auto border-collapse text-sm sm:text-base">
          <thead>
            <tr class="bg-green-500 text-white">
              <th class="p-2 border">Fecha</th>
              <th class="p-2 border">Peso (kg)</th>
              <th class="p-2 border">Altura (cm)</th>
              <th class="p-2 border">IMC</th>
              <th class="p-2 border">Cintura (cm)</th>
              <th class="p-2 border">Cadera (cm)</th>
              <th class="p-2 border">WHR</th>
              <th class="p-2 border">Acciones</th> <!-- nueva columna -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="estudio in estudios" :key="estudio.id" class="text-center border-t hover:bg-gray-50 transition">
              <td class="p-2">{{ formatFecha(estudio.created_at) }}</td>
              <td class="p-2">{{ estudio.peso }}</td>
              <td class="p-2">{{ estudio.altura }}</td>
              <td class="p-2">{{ estudio.imc }}</td>
              <td class="p-2">{{ estudio.cintura ?? '-' }}</td>
              <td class="p-2">{{ estudio.cadera ?? '-' }}</td>
              <td class="p-2">{{ estudio.whr ?? '-' }}</td>
              <td class="p-2 space-x-2">
                <button class="text-red-600 hover:underline cursor-pointer" @click="confirmEliminar(estudio.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Paginador -->
      <Paginator
        :currentPage="currentPage"
        :totalPages="pagination.totalPages"
        @changePage="handlePageChange"
      />
      </div>

    <div v-else class="text-center text-gray-500">
      No tienes estudios corporales registrados aún.
    </div>

    <!-- Imagen + info -->
    <div class="w-full flex flex-col md:flex-row justify-between items-center mt-8">
      <img src="/images/IMC.png" alt="Índice de Masa Corporal" class="max-w-full h-auto" />
      <ResultadosMetabolicos :estudios="estudios" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Paginator from '../components/Paginator.vue'
import ResultadosMetabolicos from '../components/ResultadosMetabolicos.vue'
import { useMediciones } from '../composables/UseMediciones'
const {
  estudios,
  loading,
  error,
  currentPage,
  pagination,
  fetchMediciones,
  deleteMedicion
} = useMediciones()

onMounted(() => {
  fetchMediciones()
})

const user = JSON.parse(localStorage.getItem('user') || '{}')
const nombreUsuario = user?.nombre || 'Usuario'

const edad = computed(() => {
  if (estudios.value.length === 0) return 'N/A'
  return estudios.value[estudios.value.length - 1].edad
})

const handlePageChange = (page: number) => {
  fetchMediciones(page)
}

// Formatear fecha
const formatFecha = (fecha: string) => {
  const date = new Date(fecha)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
const showModal = ref(false)
const estudioEditandoId = ref<number | null>(null)
const form = ref({
  peso: 0,
  altura: 0,
  cintura: null,
  cadera: null
})

onMounted(() => {
  fetchMediciones()
})


const comenzarEdicion = (estudio: any) => {
  estudioEditandoId.value = estudio.id
  form.value = {
    peso: estudio.peso,
    altura: estudio.altura,
    cintura: estudio.cintura ?? null,
    cadera: estudio.cadera ?? null
  }
  showModal.value = true
}


const confirmEliminar = async (id: number) => {
  if (confirm('¿Estás seguro de eliminar esta medición?')) {
    await deleteMedicion(id)
    await fetchMediciones()
  }
}
</script>
