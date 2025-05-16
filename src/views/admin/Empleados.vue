<template>
  <div class="container mx-auto p-6 space-y-10">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold mb-4">Gestión de Empleados</h1>
      <CreateButton text="Crear Empleado" @click="comenzarCreacion" />
    </div>

    <div v-if="loading" class="text-center">Cargando...</div>
    <div v-else-if="error" class="text-red-500 text-center">{{ error }}</div>

    <BaseTable :columns="columns" :data="empleados" showActions>
      <template #actions="{ row }">
        <div class="flex gap-4">
          <button @click="comenzarEdicion(row)" class="text-blue-600 hover:underline text-sm">Editar</button>
          <button @click="confirmDelete(row.id)" class="text-red-600 hover:underline text-sm">Eliminar</button>
        </div>
      </template>
    </BaseTable>

    <Modal :open="showModal" @close="showModal = false">
      <h2 class="text-2xl font-bold text-center mb-6">
        {{ modoEdicion ? 'Editar Empleado' : 'Nuevo Empleado' }}
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
          <select v-model="empleado.id_usuario" class="w-full px-4 py-2 border rounded-lg" required>
            <option disabled value="">Selecciona un usuario</option>
            <option v-for="usuario in users" :key="usuario.id_usuario" :value="usuario.id_usuario">
              {{ usuario.nombre }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input v-model="empleado.nombre" type="text" class="w-full px-4 py-2 border rounded-lg" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <select v-model="empleado.tipo" class="w-full px-4 py-2 border rounded-lg" required>
            <option value="nutricionista">Nutricionista</option>
            <option value="entrenador">Entrenador</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="empleado.email" type="email" class="w-full px-4 py-2 border rounded-lg" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="empleado.descripcion" rows="3" class="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Imagen (URL)</label>
          <input v-model="empleado.imagen" type="text" class="w-full px-4 py-2 border rounded-lg" />
        </div>
        <button type="submit" class="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700">
          {{ modoEdicion ? 'Actualizar Empleado' : 'Crear Empleado' }}
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
import { useEmpleados } from '../../composables/api/admin/UseEmpleados'
import { useUsers } from '../../composables/api/admin/UseUsers'

const {
  empleados,
  fetchEmpleados,
  createEmpleado,
  editEmpleado,
  deleteEmpleado,
  currentPage,
  pagination,
  loading,
  error
} = useEmpleados()

const showModal = ref(false)
const modoEdicion = ref(false)
const editandoId = ref<number | null>(null)

const {users,fetchUsers}= useUsers()

onMounted(()=>{
    fetchUsers();
})

const empleado = ref({
  id_usuario: 0,
  tipo: 'nutricionista',
  nombre: '',
  imagen: '',
  descripcion: '',
  email: ''
})

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'id_usuario', label: 'Usuario' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'email', label: 'Email' },
  { key: 'descripcion', label: 'Descripción' },
  { key: 'imagen', label: 'Imagen' }
]

function comenzarCreacion() {
  modoEdicion.value = false
  editandoId.value = null
  empleado.value = {
    id_usuario: 0,
    tipo: 'nutricionista',
    nombre: '',
    imagen: '',
    descripcion: '',
    email: ''
  }
  showModal.value = true
}

function comenzarEdicion(row: any) {
  modoEdicion.value = true
  editandoId.value = row.id
  empleado.value = { ...row }
  showModal.value = true
}

async function handleSubmit() {
  if (modoEdicion.value && editandoId.value !== null) {
    await editEmpleado(editandoId.value, empleado.value)
  } else {
    await createEmpleado(empleado.value)
  }
  showModal.value = false
}

async function confirmDelete(id: number) {
  if (confirm('¿Estás seguro de que quieres eliminar este empleado?')) {
    await deleteEmpleado(id)
  }
}

function handlePageChange(page: number) {
  currentPage.value = page
  fetchEmpleados()
}

onMounted(fetchEmpleados)
</script>
