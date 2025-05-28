<template>
  <div class="container mx-auto p-6 space-y-10">
    <div class="flex gap-5 md:justify-between items-center">
      <h1 class="text-xl md:text-2xl font-bold mb-4">Suscripciones</h1>
      <CreateButton text="Crear Suscripcion" @click="comenzarCreacion()" />
    </div>

    <div v-if="loading" class="text-center">Cargando...</div>
    <div v-else-if="error" class="text-center text-red-500">Error al cargar los planes.</div>

    <BaseTable :columns="columns" :data="suscripciones" showActions>
      <template #actions="{ row }">
        <div class="flex gap-5">
          <button @click="comenzarEdicion(row)" class="text-blue-600 hover:underline text-sm cursor-pointer">
            Editar
          </button>
          <button @click="openConfirm(row.id_suscripcion, '¿Estás seguro de que quieres eliminar esta suscripcion?')" class="text-red-600 hover:underline text-sm cursor-pointer">
            Eliminar
          </button>
        </div>
      </template>
    </BaseTable>

    <Modal :open="showModal" @close="showModal = false">
      <h2 class="text-2xl text-center font-bold mb-6 text-gray-800">
        {{ modoEdicion ? 'Editar Plan' : 'Nuevo Plan' }}
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input v-model="suscripcion.nombre" type="text"
                 class="w-full px-4 py-2 border rounded-lg" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Precio (€)</label>
          <input v-model="suscripcion.precio" type="number" step="0.01"
                 class="w-full px-4 py-2 border rounded-lg" required />
        </div>
        <div>
          <button type="submit"
                  class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg">
            {{ modoEdicion ? 'Actualizar Suscripción' : 'Crear Suscripción' }}
          </button>
        </div>
      </form>
    </Modal>

    <Paginator
      :currentPage="currentPage"
      :totalPages="pagination.totalPages"
      @changePage="handlePageChange"
    />
        <ModalConfirmDelete
      v-if="showConfirm"
      :message="deleteMessage"
      @confirm="handleDelete"
      @cancel="showConfirm = false"
    />
  </div>
</template>

<script setup lang="ts">
import { notify } from '@kyvg/vue3-notification'
import { onMounted, ref } from 'vue'
import CreateButton from '../../components/admin/buttons/CreateButton.vue'
import BaseTable from '../../components/admin/ui/BaseTable.vue'
import Modal from '../../components/admin/ui/Modal.vue'
import ModalConfirmDelete from '../../components/ModalConfirmDelete.vue'
import Paginator from '../../components/Paginator.vue'
import { useSuscripciones } from '../../composables/api/admin/UseSuscriptions'

const {
  suscripciones,
  fetchSuscripciones,
  createSuscripcion,
  editSuscripcion,
  deleteSuscripcion,
  currentPage,
  pagination,
  loading,
  error,
} = useSuscripciones()

const showModal = ref(false)
const modoEdicion = ref(false)
const suscripcionEditandoId = ref<number | null>(null)

const showConfirm = ref(false)
const idToDelete = ref<number | null>(null)
const deleteMessage = ref('')

const suscripcion = ref({
  nombre: '',
  precio: 0,
})

function comenzarCreacion() {
  modoEdicion.value = false
  suscripcionEditandoId.value = null
  suscripcion.value = { nombre: '', precio: 0 }
  showModal.value = true
}

function comenzarEdicion(row: any) {
  modoEdicion.value = true
  suscripcionEditandoId.value = row.id_suscripcion
  suscripcion.value = {
    nombre: row.nombre,
    precio: row.precio
  }
  showModal.value = true
}

async function handleSubmit() {
  try {
    if (modoEdicion.value && suscripcionEditandoId.value !== null) {
      await editSuscripcion(suscripcionEditandoId.value, suscripcion.value)
    } else {
      await createSuscripcion(suscripcion.value)
    }
    showModal.value = false
  } catch (err) {
    notify({ type: 'error', title: 'Error al guardar el plan' })
  }
}

const openConfirm = (id: number, message: string) => {
  idToDelete.value = id
  deleteMessage.value = message
  showConfirm.value = true
}

const handleDelete = async () => {
  if (idToDelete.value === null) return
  await deleteSuscripcion(idToDelete.value) // o deleteCategoria, etc.
  fetchSuscripciones() // o fetchCategorias, etc.
  showConfirm.value = false
}

function handlePageChange(page: number) {
  currentPage.value = page
  fetchSuscripciones()
}

onMounted(fetchSuscripciones)

const columns = [
  { key: 'id_suscripcion', label: 'ID' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'precio', label: 'Precio (€)' },
]
</script>
