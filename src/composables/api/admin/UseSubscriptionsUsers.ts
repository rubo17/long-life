import { notify } from '@kyvg/vue3-notification'
import { ref } from 'vue'
import api from '../../../api/axios'

export function useSuscripcionesUsers() {
  const suscripciones = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const currentPage = ref(1)
  const perPage = ref(10)

  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    total: 0
  })

  const fetchSuscripciones = async () => {
    loading.value = true
    try {
      const response = await api.get('/usuariosSuscripciones', {
        params: {
          page: currentPage.value,
          perPage: perPage.value
        }
      })

      suscripciones.value = response.data.data
      pagination.value = response.data.pagination
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al cargar suscripciones'
    } finally {
      loading.value = false
    }
  }

  const createSuscripcion = async (nueva: any) => {
    try {
      await api.post('/usuariosSuscripciones', nueva)
      notify({ type: 'success', title: 'Suscripción creada correctamente' })
      await fetchSuscripciones()
    } catch (err) {
      console.error('Error al crear suscripción:', err)
      notify({ type: 'error', title: 'Error al crear suscripción' })
    }
  }

  const editSuscripcion = async (id: number, data: any) => {
    try {
      await api.put(`/usuariosSuscripciones/${id}`, data)
      notify({ type: 'success', title: 'Suscripción actualizada correctamente' })
      await fetchSuscripciones()
    } catch (err) {
      console.error('Error al editar suscripción:', err)
      notify({ type: 'error', title: 'Error al editar suscripción' })
    }
  }

  const deleteSuscripcion = async (id: number) => {
    try {
      await api.delete(`/usuariosSuscripciones/${id}`)
      notify({ type: 'success', title: 'Suscripción eliminada correctamente' })
      await fetchSuscripciones()
    } catch (err) {
      console.error('Error al eliminar suscripción:', err)
      notify({ type: 'error', title: 'Error al eliminar suscripción' })
    }
  }

  return {
    suscripciones,
    loading,
    error,
    fetchSuscripciones,
    createSuscripcion,
    editSuscripcion,
    deleteSuscripcion,
    currentPage,
    perPage,
    pagination
  }
}
