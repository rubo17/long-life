// src/composables/api/cupones/useCupones.ts
import { notify } from '@kyvg/vue3-notification'
import { ref } from 'vue'
import api from '../../../api/axios'

export function useCupones() {
  const cupones = ref<any[]>([])
  const cupon = ref({
    codigo: '',
    descripcion: '',
    descuento: 0,
    tipo_descuento: 'porcentaje', 
    valido_desde: '',
    valido_hasta: '',
    solo_premium: false,
    creado_en: '',
  })

  const loading = ref(false)
  const error = ref<string | null>(null)

  const currentPage = ref(1)
  const perPage = ref(10)

  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  })

  const fetchCupones = async () => {
    loading.value = true
    try {
      const response = await api.get('/cupones', {
        params: {
          page: currentPage.value,
          perPage: perPage.value
        }
      })
      cupones.value = response.data.data
      pagination.value = response.data.pagination
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al cargar cupones'
    } finally {
      loading.value = false
    }
  }

  const createCupon = async () => {
    try {
      await api.post('/cupones', cupon.value)
      notify({ type: 'success', title: 'Cupón creado correctamente' })
      await fetchCupones()
    } catch (err) {
      console.error('Error al crear cupón:', err)
      notify({ type: 'error', title: 'Error al crear cupón' })
    }
  }

  const updateCupon = async (id: number) => {
    try {
      await api.put(`/cupones/${id}`, cupon.value)
      notify({ type: 'success', title: 'Cupón actualizado correctamente' })
      await fetchCupones()
    } catch (err) {
      console.error('Error al actualizar cupón:', err)
      notify({ type: 'error', title: 'Error al actualizar cupón' })
    }
  }

  const deleteCupon = async (id: number) => {
    try {
      await api.delete(`/cupones/${id}`)
      notify({ type: 'success', title: 'Cupón eliminado correctamente' })
      await fetchCupones()
    } catch (err) {
      console.error('Error al eliminar cupón:', err)
      notify({ type: 'error', title: 'Error al eliminar cupón' })
    }
  }

  return {
    cupones,
    cupon,
    loading,
    error,
    currentPage,
    perPage,
    pagination,
    fetchCupones,
    createCupon,
    updateCupon,
    deleteCupon
  }
}
