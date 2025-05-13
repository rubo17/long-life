import { ref } from 'vue'
import api from '../../../api/axios'

export function useEmpleados() {
  const empleados = ref<any[]>([])
  const loading = ref(false)

  const fetchEmpleados = async () => {
    loading.value = true
    try {
      const response = await api.get('/empleados')
      empleados.value = response.data
    } catch (err) {
      console.error('Error al obtener empleados:', err)
    } finally {
      loading.value = false
    }
  }

  

  return {
    empleados,
    loading,
    fetchEmpleados,
  }
}
