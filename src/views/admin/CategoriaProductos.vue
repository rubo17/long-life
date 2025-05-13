<template>
  <div class="container mx-auto p-6 space-y-10">
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold mb-4">Categorías</h1>
      <CreateButton text="Crear Categoría" @click="comenzarCreacion()" />
    </div>

    <div v-if="loading">Cargando categorías...</div>

    <BaseTable :columns="columns" :data="categorias" :showActions="true">
      <template #actions="{ row }">
        <div class="flex gap-4">
          <button @click="comenzarEdicion(row)" class="text-blue-600 hover:underline text-sm cursor-pointer">
            Editar
          </button>
          <button @click="confirmdeleteCategoria(row.id_categoria)"
            class="text-red-600 hover:underline ml-3 text-sm cursor-pointer">
            Eliminar
          </button>
        </div>
      </template>
    </BaseTable>

    <Modal :open="showModal" @close="showModal = false">
      <h2 class="text-xl font-semibold mb-4">
        {{ modoEdicion ? 'Editar Categoría' : 'Crear Categoría' }}
      </h2>

      <form @submit.prevent="guardarCategoria" class="space-y-4">
        <div>
          <label class="block mb-1 text-sm font-medium">Nombre</label>
          <input
            v-model="categoria.nombre"
            type="text"
            class="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium">Descripción</label>
          <textarea
            v-model="categoria.descripcion"
            class="w-full border rounded px-3 py-2"
            required
          ></textarea>
        </div>

        <div class="flex justify-end gap-4 pt-2">
          <button type="button" class="text-sm text-gray-600 hover:underline" @click="showModal = false">
            Cancelar
          </button>
          <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer">
            {{ modoEdicion ? 'Actualizar' : 'Crear' }}
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
import { onMounted, ref } from 'vue'
import CreateButton from '../../components/admin/buttons/CreateButton.vue'
import BaseTable from '../../components/admin/ui/BaseTable.vue'
import Modal from '../../components/admin/ui/Modal.vue'
import Paginator from '../../components/Paginator.vue'
import { useCategoriasAdmin } from '../../composables/api/admin/UseCategoriasProductos'

const {
  categorias,
  fetchCategorias,
  loading,
  pagination,
  currentPage,
  eliminarCategoria,
  crearCategoria,
  actualizarCategoria
} = useCategoriasAdmin()

const categoria = ref({ id_categoria: null, nombre: '', descripcion: '' })

const showModal = ref(false)
const modoEdicion = ref(false)

onMounted(fetchCategorias)

function handlePageChange(page: number) {
  currentPage.value = page
  fetchCategorias()
}

const comenzarCreacion = () => {
  console.log("Abrir modal")
  modoEdicion.value = false
  categoria.value = { id_categoria: null, nombre: '', descripcion: '' }
  showModal.value = true
}

const comenzarEdicion = async (categoriaParam: any) => {
  categoria.value = {
    id_categoria: categoriaParam.id_categoria,
    nombre: categoriaParam.nombre,
    descripcion: categoriaParam.descripcion
  }
  modoEdicion.value = true
  showModal.value = true
}

const guardarCategoria = async () => {
  if (modoEdicion.value) {
    await actualizarCategoria(categoria.value)
  } else {
    await crearCategoria(categoria.value)
  }
  showModal.value = false
  fetchCategorias()
}

const confirmdeleteCategoria = async (id: number) => {
  if (confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
    await eliminarCategoria(id)
    fetchCategorias()
  }
}

const columns = [
  { key: 'id_categoria', label: 'ID' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'descripcion', label: 'Descripción' }
]
</script>
