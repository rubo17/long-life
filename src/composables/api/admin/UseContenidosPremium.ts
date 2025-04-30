import axios from 'axios'
import { ref } from 'vue'

export function useContenidosPremium() {
  const contenidos = ref([])
  const loading = ref(false)
  const error = ref("")

  const nuevo = ref({
    titulo: '',
    descripcion: '',
    archivo_url: '',
    fecha_publicacion: '',
    creado_por: 1
  })

  const currentPage = ref(1)
  const perPage = ref(10)

  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    total: 0
  })

  const fetchContenidos = async () => {
    loading.value = true
    try {
      const res = await axios.get('http://localhost/longLifeBack/public/contenido-premium', {
        params: {
          page: currentPage.value,
          perPage: perPage.value
        }
      })
      contenidos.value = res.data.data
      pagination.value = res.data.pagination
    } catch (err) {
      console.error(err)
      error.value = 'Error al cargar contenidos'
    } finally {
      loading.value = false
    }
  }

  const crearContenido = async () => {
    try {
      await axios.post('http://localhost/longLifeBack/public/contenido-premium', nuevo.value, {
      })
      await fetchContenidos()
      resetNuevo()
    } catch (err) {
      console.error('Error al crear contenido:', err)
    }
  }

  const eliminarContenido = async (id: number) => {
    try {
      await axios.delete(`http://localhost/longLifeBack/public/contenido-premium/${id}`, {
      })
      await fetchContenidos()
    } catch (err) {
      console.error('Error al eliminar contenido:', err)
      error.value = "Error al eliminar contenido"
    }
  }

  const editarContenido = async (id: number) => {
    try {
      const token = localStorage.getItem('token')
      await axios.put(`http://localhost/longLifeBack/public/contenido-premium/${id}`, nuevo.value, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      await fetchContenidos()
    } catch (err) {
      console.error('Error al editar contenido:', err)
    }
  }

  const resetNuevo = () => {
    nuevo.value = {
      titulo: '',
      descripcion: '',
      archivo_url: '',
      fecha_publicacion: '',
      creado_por: 1
    }
  }

  return {
    contenidos,
    loading,
    error,
    nuevo,
    fetchContenidos,
    crearContenido,
    eliminarContenido,
    editarContenido,
    resetNuevo,
    currentPage,
    perPage,
    pagination
  }
}
