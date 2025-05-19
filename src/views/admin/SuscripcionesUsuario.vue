<template>
  <div class="container mx-auto p-6 space-y-10">
    <div class="flex gap-5 md:justify-between items-center">
      <h1 class="text-xl md:text-2xl font-bold mb-4">Suscripciones Usuario</h1>
      <CreateButton text="Crear Suscripcion Usuario" @click="comenzarCreacion()" />
    </div>

    <div v-if="loading" class="text-center">Cargando...</div>
    <div v-else-if="error" class="text-center text-red-500">Error al cargar suscripciones.</div>

    <BaseTable :columns="columns" :data="suscripciones" showActions>
      <template #actions="{ row }">
        <div class="flex gap-5">
          <button @click="comenzarEdicion(row)" class="text-blue-600 hover:underline text-sm cursor-pointer">
            Editar
          </button>
          <button @click="confirmDelete(row.id)" class="text-red-600 hover:underline text-sm cursor-pointer">
            Eliminar
          </button>
        </div>
      </template>
    </BaseTable>

    <Modal :open="showModal" @close="showModal = false">
      <h2 class="text-2xl text-center font-bold mb-6 text-gray-800">
        {{ modoEdicion ? 'Editar Suscripción' : 'Nueva Suscripción' }}
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
          <select v-model="suscripcion.id_usuario" class="w-full px-4 py-2 border rounded-lg" required>
            <option disabled value="">Selecciona un usuario</option>
            <option v-for="usuario in usuarios" :key="usuario.id_usuario" :value="usuario.id_usuario">
              {{ usuario.nombre }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>
          <select v-model="suscripcion.status" class="w-full px-4 py-2 border rounded-lg" required>
            <option value="active">Activa</option>
            <option value="canceling">Canceling</option>
            <option value="canceled">Cancelada</option>
            <option value="incomplete">Incompleta</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Suscripcion</label>
          <select v-model="suscripcion.id_suscripcion" class="w-full px-4 py-2 border rounded-lg" required>
            <option value="1">Mensual</option>
            <option value="2">Anual</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Inicio</label>
          <input v-model="suscripcion.start_date" type="date" class="w-full px-4 py-2 border rounded-lg" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Cancelación</label>
          <input v-model="suscripcion.cancel_at" type="date" class="w-full px-4 py-2 border rounded-lg" />
        </div>

        <div class="pt-2">
          <button type="submit"
            class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow transition cursor-pointer">
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
  </div>
</template>

<script setup lang="ts">
import { notify } from '@kyvg/vue3-notification'
import { onMounted, ref } from 'vue'
import api from '../../api/axios'
import CreateButton from '../../components/admin/buttons/CreateButton.vue'
import BaseTable from '../../components/admin/ui/BaseTable.vue'
import Modal from '../../components/admin/ui/Modal.vue'
import Paginator from '../../components/Paginator.vue'
import { useSuscripcionesUsers } from '../../composables/api/admin/UseSubscriptionsUsers'
import { User } from '../../types/User'

const {
  suscripciones,
  loading,
  error,
  fetchSuscripciones,
  createSuscripcion,
  deleteSuscripcion,
  editSuscripcion,
  currentPage,
  pagination,
} = useSuscripcionesUsers()
const usuarios = ref<User[]>([])
onMounted(()=>{
  fetchUsuarios()
})

async function fetchUsuarios() {
  try {
    const response = await api.get('/users') // <- crea esta ruta en tu backend
    usuarios.value = response.data.data
  } catch (err) {
    console.error('Error al cargar usuarios:', err)
    notify({ type: 'error', title: 'Error al cargar usuarios' })
  }
}
const showModal = ref(false)
const modoEdicion = ref(false)
const suscripcionEditandoId = ref<number | null>(null)

const suscripcion = ref({
  id_usuario: '',
  id_suscripcion: 1,
  status: '',
  start_date: '',
  cancel_at: '',
})

function comenzarEdicion(data: any) {
  modoEdicion.value = true
  suscripcionEditandoId.value = data.id
  suscripcion.value = { ...data }
  showModal.value = true
}

function comenzarCreacion() {
  modoEdicion.value = false
  suscripcionEditandoId.value = null
  suscripcion.value = {
    id_usuario: '',
    id_suscripcion: 1,
    status: '',
    start_date: '',
    cancel_at: '',
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
    fetchSuscripciones()
  } catch (err) {
    notify({ type: 'error', title: 'Error al guardar la suscripción' })
  }
}

async function confirmDelete(id: number) {
  if (!confirm('¿Estás seguro de que quieres eliminar esta suscripción?')) return
  await deleteSuscripcion(id)
  fetchSuscripciones()
}

function handlePageChange(page: number) {
  currentPage.value = page
  fetchSuscripciones()
}

onMounted(fetchSuscripciones)

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'nombre_usuario', label: 'Usuario' },
  { key: 'status', label: 'Estado' },
  { key: 'start_date', label: 'Inicio' },
  { key: 'cancel_at', label: 'Cancelación' },
  { key: 'nombre_suscripcion', label: 'Suscripcion' },
]
</script>
