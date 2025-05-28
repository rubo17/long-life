// src/composables/api/roles/useRoles.ts
import { notify } from '@kyvg/vue3-notification'
import { ref } from 'vue'
import api from '../../../api/axios'

export function useRoles() {
  const roles = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const currentPage = ref(1)
  const perPage = ref(10)

  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  })

  const rol = ref({
    nombre: '',
    descripcion: ''
  })

  const fetchRoles = async () => {
    loading.value = true
    try {
      const res = await api.get('/roles', {
        params: {
          page: currentPage.value,
          perPage: perPage.value
        }
      })
      roles.value = res.data.data
            pagination.value = {
            currentPage: res.data.pager.currentPage,
            totalPages: res.data.pager.lastPage, // 👈 usar lastPage como totalPages
            total: res.data.pager.total
            }
    } catch (err) {
      error.value = 'Error al cargar los roles'
      notify({ type: 'error', title: 'Error', text: error.value })
    } finally {
      loading.value = false
    }
  }

  const crearRol = async () => {
    try {
      await api.post('/roles', rol.value)
      notify({ type: 'success', title: 'Rol creado correctamente' })
      await fetchRoles()
    } catch (err) {
      notify({ type: 'error', title: 'Error', text: 'No se pudo crear el rol' })
    }
  }

  const editarRol = async (id: number) => {
    try {
      await api.put(`/roles/${id}`, rol.value)
      notify({ type: 'success', title: 'Rol actualizado correctamente' })
      await fetchRoles()
    } catch (err) {
      notify({ type: 'error', title: 'Error', text: 'No se pudo actualizar el rol' })
    }
  }

  const eliminarRol = async (id: number) => {
    try {
      await api.delete(`/roles/${id}`)
      notify({ type: 'success', title: 'Rol eliminado correctamente' })
      await fetchRoles()
    } catch (err: any) {
      const mensaje = err.response?.data?.messages?.error || 'Error al eliminar el rol'
      notify({ type: 'error', title: 'Error', text: mensaje })
    }
  }

  return {
    roles,
    rol,
    loading,
    error,
    currentPage,
    perPage,
    pagination,
    fetchRoles,
    crearRol,
    editarRol,
    eliminarRol
  }
}
