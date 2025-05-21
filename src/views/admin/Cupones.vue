<template>
  <div class="container mx-auto p-6 space-y-10">
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold mb-4">Cupones</h1>
      <CreateButton text="Crear Cupón" @click="comenzarCreacion" />
    </div>

    <div v-if="loading">Cargando cupones...</div>
    <div v-else-if="error">Error al cargar los cupones.</div>

    <BaseTable :columns="columns" :data="cupones" showActions>
      <template #actions="{ row }">
        <div class="flex gap-5">
          <button @click="comenzarEdicion(row)" class="text-blue-600 hover:underline text-sm cursor-pointer">Editar</button>
          <button @click="confirmDeleteCupon(row.id)" class="text-red-600 hover:underline text-sm cursor-pointer">Eliminar</button>
        </div>
      </template>
    </BaseTable>

    <Modal :open="showModal" @close="showModal = false">
      <h2 class="text-2xl text-center font-bold mb-6 text-gray-800">
        {{ modoEdicion ? 'Editar Cupón' : 'Nuevo Cupón' }}
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Código</label>
          <input v-model="cupon.codigo" required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-200" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="cupon.descripcion" rows="2"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-200"
            placeholder="Descripción del cupón" />
        </div>

        <div class="flex gap-4">
          <div class="w-1/2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Descuento</label>
            <input v-model="cupon.descuento" type="number" step="0.01" min="0" required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-200" />
          </div>

          <div class="w-1/2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Descuento</label>
            <select v-model="cupon.tipo_descuento" required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-200">
              <option value="porcentaje">Porcentaje</option>
              <option value="monto">Monto fijo (€)</option>
            </select>
          </div>
        </div>

        <div class="flex gap-4">
          <div class="w-1/2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Válido desde</label>
            <input v-model="cupon.valido_desde" type="date" required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-200" />
          </div>
          <div class="w-1/2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Válido hasta</label>
            <input v-model="cupon.valido_hasta" type="date" required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-200" />
          </div>
        </div>

        <div class="flex items-center gap-3">
          <input v-model="cupon.solo_premium" type="checkbox" id="premium"
            class="rounded border-gray-300 text-green-600 shadow-sm focus:ring-green-500" />
          <label for="premium" class="text-sm text-gray-700">Solo para usuarios premium</label>
        </div>

        <button type="submit"
          class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow transition">
          {{ modoEdicion ? 'Actualizar Cupón' : 'Crear Cupón' }}
        </button>
      </form>
    </Modal>

    <Paginator :currentPage="currentPage" :totalPages="pagination.totalPages" @changePage="handlePageChange" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CreateButton from '../../components/admin/buttons/CreateButton.vue'
import BaseTable from '../../components/admin/ui/BaseTable.vue'
import Modal from '../../components/admin/ui/Modal.vue'
import Paginator from '../../components/Paginator.vue'
import { useCupones } from '../../composables/api/admin/UseCupones'

const {
  cupones,
  cupon,
  fetchCupones,
  createCupon,
  updateCupon,
  deleteCupon,
  loading,
  error,
  currentPage,
  pagination
} = useCupones()

const showModal = ref(false)
const modoEdicion = ref(false)
const cuponEditandoId = ref<number | null>(null)

const comenzarCreacion = () => {
  modoEdicion.value = false
  cupon.value = {
    codigo: '',
    descripcion: '',
    descuento: 0,
    tipo_descuento: 'porcentaje',
    valido_desde: '',
    valido_hasta: '',
    solo_premium: false,
    creado_en: ''
  }
  cuponEditandoId.value = null
  showModal.value = true
}

const comenzarEdicion = (c: any) => {
  modoEdicion.value = true
  cuponEditandoId.value = c.id
  cupon.value = { ...c }
  showModal.value = true
}

const handleSubmit = async () => {
  if (modoEdicion.value && cuponEditandoId.value !== null) {
    await updateCupon(cuponEditandoId.value)
  } else {
    await createCupon()
  }
  showModal.value = false
}

const confirmDeleteCupon = async (id: number) => {
  if (confirm('¿Estás seguro de eliminar este cupón?')) {
    await deleteCupon(id)
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchCupones()
}

const columns = [
  { key: 'codigo', label: 'Código' },
  { key: 'tipo_descuento', label: 'Tipo' },
  { key: 'descuento', label: 'Descuento' },
  { key: 'valido_desde', label: 'Desde' },
  { key: 'valido_hasta', label: 'Hasta' },
  { key: 'solo_premium', label: 'Solo Premium' }
]

onMounted(fetchCupones)
</script>
