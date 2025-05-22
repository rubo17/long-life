// src/composables/api/useMediciones.ts
import { ref } from 'vue'
import api from '../api/axios'
import { Estudio } from '../types/Estudio'

export function useMediciones() {
  const estudios = ref<Estudio[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const currentPage = ref(1)
  const perPage = ref(4)

  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  })

  const fetchMediciones = async (page = currentPage.value) => {
    loading.value = true
    error.value = null
    try {
      const token = localStorage.getItem('token')
      const response = await api.get('/misMediciones', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          page,
          per_page: perPage.value
        }
      })

      estudios.value = response.data.data
      pagination.value = response.data.pagination
      pagination.value 
      currentPage.value = pagination.value.currentPage
    } catch (err: any) {
      console.error('Error al obtener las mediciones:', err)
      error.value = err.response?.data?.message || 'Error desconocido'
    } finally {
      loading.value = false
    }
  }

const deleteMedicion = async (id: number) => {
  const token = localStorage.getItem('token')
  await api.delete(`/eliminarMedicion/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

  return {
    estudios,
    loading,
    error,
    currentPage,
    perPage,
    pagination,
    fetchMediciones,
    deleteMedicion
  }
}
