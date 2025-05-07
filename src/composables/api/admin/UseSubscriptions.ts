// src/composables/api/admin/useSuscripciones.ts
import { ref } from 'vue'
import api from '../../../api/axios'

export function useSuscripciones() {
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

  return {
    suscripciones,
    loading,
    error,
    fetchSuscripciones,
    currentPage,
    perPage,
    pagination
  }
}
