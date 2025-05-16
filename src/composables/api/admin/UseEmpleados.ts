import { notify } from '@kyvg/vue3-notification'
import { ref } from 'vue'
import api from '../../../api/axios'

export function useEmpleados() {
  const empleados = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const currentPage = ref(1)
  const perPage = ref(10)

  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    total: 0
  })

  const fetchEmpleados = async () => {
    loading.value = true
    try {
      const response = await api.get('/empleados', {
        params: {
          page: currentPage.value,
          perPage: perPage.value
        }
      })
      empleados.value = response.data.data
      pagination.value = response.data.pagination
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al cargar empleados'
    } finally {
      loading.value = false
    }
  }

  const createEmpleado = async (data: any) => {
    try {
      await api.post('/empleados', data)
      notify({ type: 'success', title: 'Empleado creado correctamente' })
      await fetchEmpleados()
    } catch (err) {
      console.error('Error al crear empleado:', err)
      notify({ type: 'error', title: 'Error al crear empleado' })
    }
  }

  const editEmpleado = async (id: number, data: any) => {
    try {
      await api.put(`/empleados/${id}`, data)
      notify({ type: 'success', title: 'Empleado actualizado correctamente' })
      await fetchEmpleados()
    } catch (err) {
      console.error('Error al actualizar empleado:', err)
      notify({ type: 'error', title: 'Error al actualizar empleado' })
    }
  }

  const deleteEmpleado = async (id: number) => {
    try {
      await api.delete(`/empleados/${id}`)
      notify({ type: 'success', title: 'Empleado eliminado correctamente' })
      await fetchEmpleados()
    } catch (err) {
      console.error('Error al eliminar empleado:', err)
      notify({ type: 'error', title: 'Error al eliminar empleado' })
    }
  }

  return {
    empleados,
    loading,
    error,
    fetchEmpleados,
    createEmpleado,
    editEmpleado,
    deleteEmpleado,
    currentPage,
    perPage,
    pagination
  }
}
