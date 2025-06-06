import { onMounted, ref } from 'vue'
import api from '../api/axios'
import { Estudio } from '../types/Estudio'

export function useResultadosEstudio() {
    const estudios = ref<Estudio[]>([])

  const cargarEstudios = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await api.get('/misMediciones', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      estudios.value = response.data
    } catch (error) {
      console.error('Error al cargar los estudios:', error)
    }
  }

  onMounted(() => {
    cargarEstudios()
  })

  return {
    estudios
  }
}
