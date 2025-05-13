// src/composables/api/admin/useVentas.ts

import { notify } from '@kyvg/vue3-notification'
import { ref } from 'vue'
import api from '../../../api/axios'

export function useVentas() {
  const ventas = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const currentPage = ref(1)
  const perPage = ref(10)

  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    total: 0
  })
  const ventaSeleccionada= ref()

  const fetchVentas = async () => {
    loading.value = true
    try {
      const response = await api.get('/ventas', {
        params: {
          page: currentPage.value,
          perPage: perPage.value
        }
      })

      ventas.value = response.data.data
      pagination.value = response.data.pagination
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al cargar ventas'
    } finally {
      loading.value = false
    }
  }
  const getDetallesVenta = async (idVenta: number) => {
    try {
      const response = await api.get(`/detallesVenta/${idVenta}`)
      return response.data
    } catch (error) {
      console.error('Error al obtener detalles de venta:', error)
      return []
    }
  }
  const actualizarEstado = async (venta: any) => {
    try {
      await api.put(`/admin/ventas/${venta.id}/estado`, {
        estado: venta.estado
      })
      notify({ type: 'success', title: 'Estado actualizado correctamente' })
      fetchVentas()
    } catch (err) {
      notify({ type: 'error', title: 'Error al actualizar estado' })
    }
  }

  return {
    ventas,
    loading,
    error,
    fetchVentas,
    currentPage,
    perPage,
    pagination,
    getDetallesVenta,
    actualizarEstado
  }
}
