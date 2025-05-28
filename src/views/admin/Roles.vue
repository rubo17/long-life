<template>
  <div class="container mx-auto p-6 space-y-10">
    <div class="flex gap-5 md:justify-between items-center">
      <h1 class="text-xl md:text-2xl font-bold mb-4">Roles</h1>
      <CreateButton text="Crear Rol" @click="comenzarCreacion()" />
    </div>

    <div v-if="loading">Cargando...</div>

    <BaseTable :columns="columns" :data="roles" showActions>
      <template #actions="{ row }">
        <div class="flex gap-5">
          <button @click="comenzarEdicion(row)" class="text-blue-600 hover:underline text-sm cursor-pointer">
            Editar
          </button>
          <button @click="openConfirm(row.id, '¿Estás seguro de que quieres eliminar este rol?')"
                  class="text-red-600 hover:underline text-sm cursor-pointer">
            Eliminar
          </button>
        </div>
      </template>
    </BaseTable>

    <Modal :open="showModal" @close="showModal = false">
      <h2 class="text-2xl text-center font-bold mb-6 text-gray-800">{{ modoEdicion ? 'Editar Rol' : 'Nuevo Rol' }}</h2>
      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input v-model="rol.nombre" type="text" required
                 class="w-full px-4 py-2 border rounded-lg shadow-sm" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="rol.descripcion"
                    class="w-full px-4 py-2 border rounded-lg shadow-sm"></textarea>
        </div>

        <div class="pt-2">
          <button type="submit"
                  class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow cursor-pointer">
            {{ modoEdicion ? 'Editar Rol' : 'Crear Rol' }}
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
      :confirmMessage="'Eliminar Rol'"
      @confirm="handleDelete"
      @cancel="showConfirm = false"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CreateButton from '../../components/admin/buttons/CreateButton.vue'
import BaseTable from '../../components/admin/ui/BaseTable.vue'
import Modal from '../../components/admin/ui/Modal.vue'
import ModalConfirmDelete from '../../components/ModalConfirmDelete.vue'
import Paginator from '../../components/Paginator.vue'
import { useRoles } from '../../composables/api/admin/UseRoles'

const {
  roles,
  rol,
  loading,
  error,
  currentPage,
  pagination,
  fetchRoles,
  crearRol,
  editarRol,
  eliminarRol
} = useRoles()

const showModal = ref(false)
const showConfirm = ref(false)
const modoEdicion = ref(false)
const rolEditandoId = ref<number | null>(null)
const idToDelete = ref<number | null>(null)
const deleteMessage = ref('')

const columns = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'descripcion', label: 'Descripción' }
]

const comenzarCreacion = () => {
  rol.value = { nombre: '', descripcion: '' }
  modoEdicion.value = false
  showModal.value = true
}

const comenzarEdicion = (row: any) => {
  rol.value = { nombre: row.nombre, descripcion: row.descripcion }
  rolEditandoId.value = row.id
  modoEdicion.value = true
  showModal.value = true
}

const handleSubmit = async () => {
  if (modoEdicion.value && rolEditandoId.value !== null) {
    await editarRol(rolEditandoId.value)
  } else {
    await crearRol()
  }
  showModal.value = false
}

const openConfirm = (id: number, message: string) => {
  idToDelete.value = id
  deleteMessage.value = message
  showConfirm.value = true
}

const handleDelete = async () => {
  if (idToDelete.value !== null) {
    await eliminarRol(idToDelete.value)
    showConfirm.value = false
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchRoles()
}

onMounted(fetchRoles)
</script>
