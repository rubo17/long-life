import { notify } from '@kyvg/vue3-notification'
import { ref } from 'vue'
import api from '../../../api/axios'

export function usePlanesUsuarios() {
  const planesUsuarios = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const currentPage = ref(1)
  const perPage = ref(10)

  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    total: 0
  })

  const fetchPlanesUsuarios = async () => {
    loading.value = true
    try {
      const response = await api.get('/usuariosplanes', {
        params: {
          page: currentPage.value,
          perPage: perPage.value
        }
      })

      planesUsuarios.value = response.data.data
      pagination.value = response.data.pagination
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al cargar planes de usuarios'
    } finally {
      loading.value = false
    }
  }

  const createPlanUsuario = async (data: any) => {
    try {
      await api.post('/usuariosplanes', data)
      notify({ type: 'success', title: 'Plan asignado correctamente' })
      await fetchPlanesUsuarios()
    } catch (err) {
      console.error('Error al asignar plan:', err)
      notify({ type: 'error', title: 'Error al asignar plan' })
    }
  }

  const editPlanUsuario = async (id: number, data: any) => {
    try {
      await api.put(`/usuariosplanes/${id}`, data)
      notify({ type: 'success', title: 'Plan actualizado correctamente' })
      await fetchPlanesUsuarios()
    } catch (err) {
      console.error('Error al actualizar plan:', err)
      notify({ type: 'error', title: 'Error al actualizar plan' })
    }
  }

  const deletePlanUsuario = async (id: number) => {
    try {
      await api.delete(`/usuariosplanes/${id}`)
      notify({ type: 'success', title: 'Plan eliminado correctamente' })
      await fetchPlanesUsuarios()
    } catch (err) {
      console.error('Error al eliminar plan:', err)
      notify({ type: 'error', title: 'Error al eliminar plan' })
    }
  }

  return {
    planesUsuarios,
    loading,
    error,
    fetchPlanesUsuarios,
    createPlanUsuario,
    editPlanUsuario,
    deletePlanUsuario,
    currentPage,
    perPage,
    pagination
  }
}
