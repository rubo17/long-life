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
            <th class="p-2 border">
              <div class="flex items-center gap-1 justify-center">
                IMC
                <Info class="w-5 h-5 cursor-pointer align-middle" @click="mostrarInfoIMC" />
              </div>
            </th>
            <th class="p-2 border">Cintura (cm)</th>
            <th class="p-2 border">Cadera (cm)</th>
            <th class="p-2 border">
              <div class="flex items-center gap-1 justify-center">
                WHR
                <Info class="w-5 h-5 cursor-pointer align-middle" @click="mostrarInfoWHR" />
              </div>
            </th>
            <th class="p-2 border">Acciones</th>
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
                <button class="text-red-600 hover:underline cursor-pointer" @click="openConfirm(estudio.id, '¿Estás seguro de que quieres eliminar este producto?')">Eliminar</button>
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
    <ModalConfirmDelete
      v-if="showConfirm"
      :message="deleteMessage"
      @confirm="handleDelete"
      @cancel="showConfirm = false"
    />
  </div>
      <ModalInfo
      v-if="showModal"
      :title="modalTitle"
      :message="modalMessage"
      @close="showModal = false"
    />

</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Info from '../components/icons/Info.vue';
import ModalConfirmDelete from "../components/ModalConfirmDelete.vue";
import ModalInfo from '../components/ModalInfo.vue';
import Paginator from '../components/Paginator.vue';
import ResultadosMetabolicos from '../components/ResultadosMetabolicos.vue';
import { useMediciones } from '../composables/UseMediciones';



const {
  estudios,
  loading,
  error,
  currentPage,
  pagination,
  fetchMediciones,
  deleteMedicion
} = useMediciones()

const showConfirm = ref(false)
const idToDelete = ref<number | null>(null)
const deleteMessage = ref('')

const showModal = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')

const mostrarInfoIMC = () => {
  modalTitle.value = '¿Qué es el IMC?'
  modalMessage.value = `El Índice de Masa Corporal (IMC) es una medida que relaciona el peso y la altura de una persona. 
Se calcula como: IMC = peso (kg) / (altura (m))². 
Un IMC saludable suele estar entre 18.5 y 24.9.`
  showModal.value = true
}

const mostrarInfoWHR = () => {
  modalTitle.value = '¿Qué es el WHR?'
  modalMessage.value = `La Relación Cintura-Cadera (WHR, por sus siglas en inglés) evalúa la distribución de grasa corporal. 
Se calcula dividiendo el perímetro de la cintura entre el de la cadera. 
Valores altos pueden indicar mayor riesgo cardiovascular.`
  showModal.value = true
}

onMounted(() => {
  fetchMediciones()
})

const openConfirm = (id: number, message: string) => {
  idToDelete.value = id
  deleteMessage.value = message
  showConfirm.value = true
}

const handleDelete = async () => {
  if (idToDelete.value === null) return
  await deleteMedicion(idToDelete.value) 
  fetchMediciones() 
  showConfirm.value = false
}

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


onMounted(() => {
  fetchMediciones()
})


</script>
