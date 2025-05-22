<template>
  <div class="container mx-auto p-6 space-y-10">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold mb-4">Planes asignados a usuarios</h1>
      <CreateButton text="Asignar nuevo plan" @click="comenzarCreacion" />
    </div>

    <div v-if="loading" class="text-center">Cargando...</div>
    <div v-else-if="error" class="text-center text-red-500">Error al cargar los registros.</div>

    <BaseTable :columns="columns" :data="planesUsuarios" showActions>
      <template #actions="{ row }">
        <div class="flex gap-5">
          <button @click="comenzarEdicion(row)" class="text-blue-600 hover:underline text-sm">Editar</button>
          <button @click="openConfirm(row.id, '¿Estás seguro de que quieres eliminar este registro de plan usuario?')" class="text-red-600 hover:underline text-sm">Eliminar</button>
        </div>
      </template>
    </BaseTable>

    <Modal :open="showModal" @close="showModal = false">
      <h2 class="text-2xl font-bold text-center mb-6">{{ modoEdicion ? 'Editar asignación' : 'Asignar plan a usuario' }}</h2>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
          <select v-model="plan.id_usuario" class="w-full px-4 py-2 border rounded-lg" required>
            <option disabled value="">Selecciona un usuario</option>
            <option v-for="usuario in users" :key="usuario.id_usuario" :value="usuario.id_usuario">
              {{ usuario.nombre }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">ID Plan</label>
          <input v-model="plan.id_plan" type="number" class="w-full px-4 py-2 border rounded-lg" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
          <select v-model="plan.id_empleado" class="w-full px-4 py-2 border rounded-lg" required>
            <option disabled value="">Selecciona un usuario</option>
            <option v-for="empleado in empleados" :key="empleado.id" :value="empleado.id">
              {{ empleado.nombre }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>
          <select v-model="plan.status" class="w-full px-4 py-2 border rounded-lg" required>
            <option value="pendiente">Pendiente</option>
            <option value="activo">Activo</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Fecha de inicio</label>
          <input v-model="plan.fecha_inicio" type="date" class="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Fecha de fin</label>
          <input v-model="plan.fecha_fin" type="date" class="w-full px-4 py-2 border rounded-lg" />
        </div>
        <button type="submit" class="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700">
          {{ modoEdicion ? 'Actualizar asignación' : 'Asignar plan' }}
        </button>
      </form>
    </Modal>
    <ModalConfirmDelete
      v-if="showConfirm"
      :message="deleteMessage"
      @confirm="handleDelete"
      @cancel="showConfirm = false"
    />
    <Paginator :currentPage="currentPage" :totalPages="pagination.totalPages" @changePage="handlePageChange" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CreateButton from '../../components/admin/buttons/CreateButton.vue'
import BaseTable from '../../components/admin/ui/BaseTable.vue'
import Modal from '../../components/admin/ui/Modal.vue'
import ModalConfirmDelete from '../../components/ModalConfirmDelete.vue'
import Paginator from '../../components/Paginator.vue'
import { useEmpleados } from '../../composables/api/admin/UseEmpleados'
import { usePlanesUsuarios } from '../../composables/api/admin/usePlanesUsuarios'
import { useUsers } from '../../composables/api/admin/UseUsers'
const {
  planesUsuarios,
  fetchPlanesUsuarios,
  createPlanUsuario,
  editPlanUsuario,
  deletePlanUsuario,
  loading,
  error,
  currentPage,
  pagination
} = usePlanesUsuarios()

const {users,fetchUsers} = useUsers();
const {empleados,fetchEmpleados}= useEmpleados();

const showModal = ref(false)
const modoEdicion = ref(false)
const editandoId = ref<number | null>(null)

const showConfirm = ref(false)
const idToDelete = ref<number | null>(null)
const deleteMessage = ref('')

onMounted(()=>{
  fetchUsers()
  fetchEmpleados()
})

const plan = ref({
  id_usuario: '',
  id_plan: '',
  id_empleado: '',
  status: 'pendiente',
  fecha_inicio: '',
  fecha_fin: ''
})

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'nombre_usuario', label: 'Usuario' },
  { key: 'nombre_plan', label: 'Plan' },
  { key: 'empleado_nombre', label: 'Empleado' },
  { key: 'status', label: 'Estado' },
  { key: 'fecha_inicio', label: 'Inicio' },
  { key: 'fecha_fin', label: 'Fin' }
]

function comenzarCreacion() {
  modoEdicion.value = false
  editandoId.value = null
  plan.value = {
    id_usuario: '',
    id_plan: '',
    id_empleado: '',
    status: 'pendiente',
    fecha_inicio: '',
    fecha_fin: ''
  }
  showModal.value = true
}

function comenzarEdicion(row: any) {
  modoEdicion.value = true
  editandoId.value = row.id
  plan.value = {
    id_usuario: row.id_usuario,
    id_plan: row.id_plan,
    id_empleado: row.id_empleado,
    status: row.status,
    fecha_inicio: row.fecha_inicio,
    fecha_fin: row.fecha_fin
  }
  showModal.value = true
}

async function handleSubmit() {
  if (modoEdicion.value && editandoId.value !== null) {
    await editPlanUsuario(editandoId.value, plan.value)
  } else {
    await createPlanUsuario(plan.value)
  }
  showModal.value = false
}

const openConfirm = (id: number, message: string) => {
  idToDelete.value = id
  deleteMessage.value = message
  showConfirm.value = true
}

const handleDelete = async () => {
  if (idToDelete.value === null) return
  await deletePlanUsuario(idToDelete.value) 
  fetchPlanesUsuarios() 
  showConfirm.value = false
}

function handlePageChange(page: number) {
  currentPage.value = page
  fetchPlanesUsuarios()
}

onMounted(fetchPlanesUsuarios)
</script>
