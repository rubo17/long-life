<template>
  <div class="container mx-auto p-6 space-y-10">
    <div class="flex gap-5 md:justify-between items-center">
      <h1 class="text-xl md:text-2xl font-bold mb-4">Planes</h1>
      <CreateButton text="Crear Plan" @click="abrirNuevo()" />
    </div>

    <div v-if="loading" class="text-center">Cargando...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>

    <BaseTable :columns="columns" :data="planes" showActions>
      <template #actions="{ row }">
        <div class="flex gap-3">
          <button @click="abrirEdicion(row)" class="text-blue-600 hover:underline text-sm">Editar</button>
          <button @click="confirmarEliminar(row.id_plan)" class="text-red-600 hover:underline text-sm">Eliminar</button>
        </div>
      </template>
    </BaseTable>

<Modal :open="showModal" @close="showModal = false">
  <h2 class="text-2xl text-center font-bold mb-6 text-gray-800">
    {{ modoEdicion ? 'Editar Plan' : 'Nuevo Plan' }}
  </h2>

  <form @submit.prevent="guardarPlan" class="space-y-5">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
      <input
        v-model="plan.nombre"
        type="text"
        placeholder="Nombre"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
        required
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
      <textarea
        v-model="plan.descripcion"
        placeholder="Descripción"
        rows="3"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
        required
      ></textarea>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de empleado</label>
      <select
        v-model="plan.tipo_empleado"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
        required
      >
        <option disabled value="">Selecciona un tipo</option>
        <option value="nutricionista">Nutricionista</option>
        <option value="entrenador">Entrenador</option>
      </select>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Precio (€)</label>
      <input
        v-model="plan.precio"
        type="number"
        step="0.01"
        placeholder="0.00"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
        required
      />
    </div>

    <div>
      <button
        type="submit"
        class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow transition"
      >
        {{ modoEdicion ? 'Actualizar Plan' : 'Crear Plan' }}
      </button>
    </div>
  </form>
</Modal>


    <Paginator :currentPage="currentPage" :totalPages="pagination.totalPages" @changePage="cambiarPagina" />
  </div>
</template>

<script setup lang="ts">
import CreateButton from '../../components/admin/buttons/CreateButton.vue'
import BaseTable from '../../components/admin/ui/BaseTable.vue'
import Modal from '../../components/admin/ui/Modal.vue'
import { usePlanes } from '../../composables/api/admin/UsePlanes'

import { onMounted, ref } from 'vue'

const {
  planes,
  fetchPlanes,
  createPlan,
  editPlan,
  deletePlan,
  loading,
  error,
  currentPage,
  pagination
} = usePlanes()

const showModal = ref(false)
const modoEdicion = ref(false)
const editandoId = ref<number | null>(null)

const plan = ref({
  nombre: '',
  descripcion: '',
  tipo_empleado: '',
  precio: 0
})

const columns = [
  { key: 'id_plan', label: 'ID' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'descripcion', label: 'Descripción' },
  { key: 'tipo_empleado', label: 'Tipo de empleado' },
  { key: 'precio', label: 'Precio (€)' }
]

function abrirNuevo() {
  modoEdicion.value = false
  editandoId.value = null
  plan.value = {
    nombre: '',
    descripcion: '',
    tipo_empleado: '',
    precio: 0
  }
  showModal.value = true
}

function abrirEdicion(data: any) {
  modoEdicion.value = true
  editandoId.value = data.id_plan
  plan.value = { ...data }
  showModal.value = true
}

async function guardarPlan() {
  if (modoEdicion.value && editandoId.value !== null) {
    await editPlan(editandoId.value, plan.value)
  } else {
    await createPlan(plan.value)
  }
  showModal.value = false
}

async function confirmarEliminar(id: number) {
  if (confirm('¿Seguro que deseas eliminar este plan?')) {
    await deletePlan(id)
  }
}

function cambiarPagina(pagina: number) {
  currentPage.value = pagina
  fetchPlanes()
}

onMounted(fetchPlanes)
</script>

