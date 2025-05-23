<template>
  <div class="container mx-auto p-6 space-y-10">
    <h1 class="text-xl md:text-2xl font-bold mb-4">Usuarios Desactivados</h1>

    <div v-if="loading">Cargando usuarios...</div>
    <div v-else-if="error">Error al cargar los usuarios.</div>

    <BaseTable :columns="columns" :data="usuarios" showActions>
      <template #actions="{ row }">
        <button
          @click="activarUsuario(row.id_usuario)"
          class="text-green-600 hover:underline text-sm cursor-pointer"
        >
          Activar
        </button>
      </template>
    </BaseTable>

    <Paginator
      :currentPage="currentPage"
      :totalPages="pagination.totalPages"
      @changePage="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification'
import { onMounted, ref } from 'vue'
import api from '../../api/axios'
import BaseTable from '../../components/admin/ui/BaseTable.vue'
import Paginator from '../../components/Paginator.vue'

const { notify } = useNotification()

const usuarios = ref([])
const loading = ref(false)
const error = ref(false)
const currentPage = ref(1)
const perPage = ref(10)
const totalItems = ref(0)

const pagination = ref({
  totalPages: 1
})

const fetchUsuarios = async () => {
  loading.value = true
  error.value = false
  try {
    const { data } = await api.get('/usuarios/desactivados', {
      params: {
        page: currentPage.value,
        perPage: perPage.value
      }
    })

    usuarios.value = data.data
    totalItems.value = data.pagination?.total ?? data.data.length
    pagination.value.totalPages = data.pagination?.totalPages ?? 1
  } catch (err) {
    error.value = true
    notify({ type: 'error', text: 'Error al cargar los usuarios' })
  } finally {
    loading.value = false
  }
}

const activarUsuario = async (id: number) => {
  try {
    await api.post(`/usuarios/${id}/activar`)
    notify({ type: 'success', text: 'Usuario activado correctamente' })
    fetchUsuarios()
  } catch (err) {
    notify({ type: 'error', text: 'Error al activar el usuario' })
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchUsuarios()
}

const columns = [
  { key: 'id_usuario', label: 'ID' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'email', label: 'Email' },
  { key: 'rol_nombre', label: 'Rol' },
]
onMounted(fetchUsuarios)
</script>
