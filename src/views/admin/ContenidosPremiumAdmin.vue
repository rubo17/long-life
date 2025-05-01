<template>
  <div class="container mx-auto p-6 space-y-10">
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold mb-4">Contenidos Premium</h1>
      <CreateButton text="Crear Contenido Premium" @click="comenzarCreacion" />

    </div>

    <div v-if="loading" class="text-center">Cargando...</div>

    <div v-else>
      <BaseTable :columns="columns" :data="contenidos" showActions>
        <template #actions="{ row }">
          <div class="flex gap-5">
            <a
              :href="BASE_URL + row.archivo_url"
              target="_blank"
              class="p-2 rounded-full hover:bg-gray-200 transition"
              title="Ver PDF"
            >
              <ViewDetails class="w-5 h-5 text-gray-600 hover:text-blue-500 cursor-pointer" />
            </a>
            <button @click="activarEdicion(row)" class="text-blue-600 hover:underline text-sm cursor-pointer">
            Editar
          </button>
          <button @click="confirmarEliminacion(row.id)"
            class="text-red-600 hover:underline ml-3 text-sm cursor-pointer">
            Eliminar
          </button>
          </div>
        </template>
      </BaseTable>
      <Modal :open="showModal" @close="showModal = false">
  <h2 class="text-2xl text-center font-bold mb-6 text-gray-800">
    {{ modoEdicion ? 'Editar Contenido' : 'Nuevo Contenido' }}
  </h2>

  <form @submit.prevent="handleSubmit" class="space-y-5">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
      <input v-model="nuevo.titulo" type="text" required
        class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none" />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
      <textarea v-model="nuevo.descripcion" required
        class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"></textarea>
    </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Archivo (PDF)</label>
        <input @change="handleFileUpload" type="file" accept=".pdf"
          class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none bg-white" />
      </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Fecha de publicación</label>
      <input v-model="nuevo.fecha_publicacion" type="date"
        class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none" />
    </div>

    <div class="pt-2">
      <button type="submit"
            class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow transition cursor-pointer">
            {{ modoEdicion ? 'Editar Contenido' : 'Crear Contrenido' }}
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
  </div>
</template>

<script setup lang="ts">
import { notify } from '@kyvg/vue3-notification'
import { onMounted, ref } from 'vue'
import CreateButton from '../../components/admin/buttons/CreateButton.vue'
import BaseTable from '../../components/admin/ui/BaseTable.vue'
import Modal from '../../components/admin/ui/Modal.vue'
import ViewDetails from '../../components/icons/ViewDetails.vue'
import Paginator from '../../components/Paginator.vue'
import { useContenidosPremium } from '../../composables/api/admin/UseContenidosPremium'
const {
  contenidos,
  loading,
  fetchContenidos,
  currentPage,
  pagination,
  eliminarContenido,
  crearContenido,
  editarContenido,
  nuevo,
  resetNuevo
} = useContenidosPremium()

const showModal = ref(false)
const modoEdicion = ref(false)
const contenidoEditandoId = ref<number | null>(null)
const BASE_URL = 'http://localhost/longLifeBack/public/' // Ajusta según tu entorno

onMounted(fetchContenidos)
const handleSubmit = async () => {
  try {
    if (modoEdicion.value && contenidoEditandoId.value) {
      await editarContenido(contenidoEditandoId.value)
    } else {
      await crearContenido()
    }

    showModal.value = false
    modoEdicion.value = false
    contenidoEditandoId.value = null
  } catch (err) {
    notify({
      type: 'error',
      title: 'Error al guardar contenido',
      text: 'Ocurrió un problema al procesar la solicitud'
    })
  }
}
const archivoSeleccionado = ref<File | null>(null)

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    archivoSeleccionado.value = target.files[0]
    nuevo.value.archivoFile = archivoSeleccionado.value
  }
}

const comenzarCreacion = () => {
  modoEdicion.value = false;
  showModal.value = true;

}
function activarEdicion(row: any) {
  modoEdicion.value = true
  contenidoEditandoId.value = row.id
  showModal.value = true

  // Rellenar datos
  nuevo.value = {
  titulo: row.titulo,
  descripcion: row.descripcion,
  fecha_publicacion: row.fecha_publicacion,
  archivoFile: null
}
}
function handlePageChange(page: number) {
  currentPage.value = page
  fetchContenidos()
}
const confirmarEliminacion = async (id: number) => {
  if (!confirm('¿Estás seguro de que quieres eliminar este contenido?')) return;
  await eliminarContenido(id);
};
const columns = [
  { key: 'id', label: 'ID' },
  { key: 'titulo', label: 'Título' },
  { key: 'descripcion', label: 'Descripción' },
  { key: 'fecha_publicacion', label: 'Publicado' },
  { key: 'archivo_url', label: 'Archivo' }
]
</script>
