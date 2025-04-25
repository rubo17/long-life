import axios from 'axios'
import { ref } from 'vue'

export function useEmpleados() {
  const empleados = ref<any[]>([])
  const loading = ref(false)

  const fetchEmpleados = async () => {
    loading.value = true
    try {
      const response = await axios.get('http://localhost/longLifeBack/public/empleados')
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
