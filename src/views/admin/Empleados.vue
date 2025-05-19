<template>
  <div class="container mx-auto p-6 space-y-10">
    <div class="flex gap-5 md:justify-between items-center">
      <h1 class="text-xl md:text-2xl font-bold mb-4">Empleados</h1>
      <CreateButton text="Crear Empleados" @click="comenzarCreacion()" />
    </div>

    <div v-if="loading">Cargando empleados...</div>
    <div v-else-if="error">Error al cargar los empleados.</div>

    <BaseTable :columns="columns" :data="empleados" showActions>
      <template #actions="{ row }">
        <div class="flex gap-5">
          <button @click="comenzarEdicion(row)" class="text-blue-600 hover:underline text-sm cursor-pointer">Editar</button>
          <button @click="confirmDeleteEmpleado(row.id)" class="text-red-600 hover:underline text-sm cursor-pointer">Eliminar</button>
        </div>
      </template>
    </BaseTable>

    <Modal :open="showModal" @close="showModal = false">
      <h2 class="text-2xl text-center font-bold mb-6 text-gray-800">
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
          <input v-model="empleado.nombre" type="text" required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-200" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="empleado.email" type="email" required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-200" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <select v-model="empleado.tipo"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-200" required>
            <option disabled value="">Selecciona un tipo</option>
            <option value="nutricionista">Nutricionista</option>
            <option value="entrenador">Entrenador</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="empleado.descripcion" rows="2"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-200"
            placeholder="Descripción del empleado" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
          <div class="flex items-center gap-4">
            <img v-if="previewUrl" :src="previewUrl" alt="Vista previa" class="w-40 h-40 object-cover rounded-md border" />
            <label for="imagenUpload"
              class="cursor-pointer flex-1 px-4 py-2 border-2 border-dashed rounded-md text-gray-600 hover:border-green-500 hover:text-green-600 transition">
              📁 Seleccionar Imagen
              <input id="imagenUpload" type="file" class="hidden" @change="onFileChange" />
            </label>
          </div>
        </div>

        <button type="submit"
          class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow transition">
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
import Paginator from '../../components/Paginator.vue'
import { useEmpleados } from '../../composables/api/admin/UseEmpleados'
import { useUsers } from '../../composables/api/admin/UseUsers'
const {
  empleados, empleado, createEmpleado, editEmpleado, deleteEmpleado,
  fetchEmpleados, loading, error, currentPage, pagination
} = useEmpleados()
const {fetchUsers,users}= useUsers();
const showModal = ref(false)
const modoEdicion = ref(false)
const previewUrl = ref<string | null>(null)
const empleadoEditandoId = ref<number | null>(null)

const comenzarCreacion = () => {
  modoEdicion.value = false
  empleadoEditandoId.value = null
  empleado.value = {id_usuario:'', nombre: '', email: '', tipo: '', descripcion: '', imagenFile: null }
  previewUrl.value = null
  showModal.value = true
}

const comenzarEdicion = (emp: any) => {
  modoEdicion.value = true
  empleadoEditandoId.value = emp.id
  empleado.value = {
    id_usuario: emp.id_usuario,
    nombre: emp.nombre,
    email: emp.email,
    tipo: emp.tipo,
    descripcion: emp.descripcion || '',
    imagenFile: null,
  }
  previewUrl.value = emp.imagen ? `/uploads/empleados/${emp.imagen}` : null
  showModal.value = true
}

const onFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    empleado.value.imagenFile = file
    previewUrl.value = URL.createObjectURL(file)
  }
}

const handleSubmit = async () => {
  if (modoEdicion.value && empleadoEditandoId.value !== null) {
    await editEmpleado(empleadoEditandoId.value)
  } else {
    await createEmpleado()
  }
  showModal.value = false
  empleado.value = {id_usuario:'', nombre: '', email: '', tipo: '', descripcion: '', imagenFile: null }
  previewUrl.value = null
  modoEdicion.value = false
  empleadoEditandoId.value = null
}

const confirmDeleteEmpleado = async (id: number) => {
  if (confirm('¿Estás seguro de que quieres eliminar este empleado?')) {
    await deleteEmpleado(id)
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchEmpleados()
}

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'id_usuario', label: 'id_usuario' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'email', label: 'Email' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'descripcion', label: 'Descripción' },
  { key: 'imagen', label: 'Imagen' },
]

onMounted(()=>{
  fetchEmpleados()
  fetchUsers()
})
</script>
