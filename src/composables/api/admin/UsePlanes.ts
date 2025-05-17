// src/composables/api/admin/usePlanes.ts
import { notify } from '@kyvg/vue3-notification'
import { ref } from 'vue'
import api from '../../../api/axios'

export function usePlanes() {
  const planes = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const currentPage = ref(1)
  const perPage = ref(10)

  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    total: 0
  })

  const fetchPlanes = async () => {
    loading.value = true
    try {
      const res = await api.get('/planes', {
        params: { page: currentPage.value, perPage: perPage.value }
      })
      planes.value = res.data.data
      pagination.value = res.data.pagination
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al cargar los planes'
    } finally {
      loading.value = false
    }
  }

  const createPlan = async (data: any) => {
    try {
      await api.post('/planes', data)
      notify({ type: 'success', title: 'Plan creado correctamente' })
      await fetchPlanes()
    } catch (err) {
      console.error(err)
      notify({ type: 'error', title: 'Error al crear el plan' })
    }
  }

  const editPlan = async (id: number, data: any) => {
    try {
      await api.put(`/planes/${id}`, data)
      notify({ type: 'success', title: 'Plan actualizado correctamente' })
      await fetchPlanes()
    } catch (err) {
      console.error(err)
      notify({ type: 'error', title: 'Error al actualizar el plan' })
    }
  }

  const deletePlan = async (id: number) => {
    try {
      await api.delete(`/planes/${id}`)
      notify({ type: 'success', title: 'Plan eliminado correctamente' })
      await fetchPlanes()
    } catch (err) {
      console.error(err)
      notify({ type: 'error', title: 'Error al eliminar el plan' })
    }
  }

  return {
    planes,
    loading,
    error,
    fetchPlanes,
    createPlan,
    editPlan,
    deletePlan,
    currentPage,
    perPage,
    pagination
  }
}
