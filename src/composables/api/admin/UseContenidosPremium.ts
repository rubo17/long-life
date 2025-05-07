// src/composables/api/admin/UseContenidosPremium.ts
import { notify } from '@kyvg/vue3-notification'
import { ref } from 'vue'
import api from '../../../api/axios'

export function useContenidosPremium() {
  const contenidos = ref([])
  const loading = ref(false)
  const error = ref(null)

  const nuevo = ref({
    titulo: '',
    descripcion: '',
    fecha_publicacion: '',
    archivoFile: null as File | null
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
      const res = await api.get('/contenido-premium', {
        params: {
          page: currentPage.value,
          perPage: perPage.value
        }
      })
      contenidos.value = res.data.data
      pagination.value = res.data.pagination
    } catch (err) {
      console.error('Error al obtener contenidos:', err)
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const createFormData = () => {
    const formData = new FormData()
    formData.append('titulo', nuevo.value.titulo)
    formData.append('descripcion', nuevo.value.descripcion)
    formData.append('fecha_publicacion', nuevo.value.fecha_publicacion)

    if (nuevo.value.archivoFile) {
      formData.append('archivo', nuevo.value.archivoFile)
    }

    return formData
  }

  const crearContenido = async () => {
    try {
      const formData = createFormData()
      await api.post('/contenido-premium', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      notify({ type: 'success', title: 'Contenido creado correctamente' })
      await fetchContenidos()
      resetNuevo()
    } catch (err) {
      console.error('Error al crear contenido:', err)
      notify({ type: 'error', title: 'Error al crear contenido' })
    }
  }

  const editarContenido = async (id: number) => {
    try {
      const formData = createFormData()
      await api.post(`/updateContenidoPremium/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      notify({ type: 'success', title: 'Contenido editado correctamente' })
      await fetchContenidos()
    } catch (err) {
      console.error('Error al editar contenido:', err)
      notify({ type: 'error', title: 'Error al editar contenido' })
    }
  }

  const eliminarContenido = async (id: number) => {
    try {
      await api.delete(`/contenido-premium/${id}`)
      notify({ type: 'success', title: 'Contenido eliminado correctamente' })
      await fetchContenidos()
    } catch (err) {
      console.error('Error al eliminar contenido:', err)
      notify({ type: 'error', title: 'Error al eliminar contenido' })
    }
  }

  const resetNuevo = () => {
    nuevo.value = {
      titulo: '',
      descripcion: '',
      fecha_publicacion: '',
      archivoFile: null
    }
  }

  return {
    contenidos,
    nuevo,
    loading,
    error,
    fetchContenidos,
    crearContenido,
    editarContenido,
    eliminarContenido,
    resetNuevo,
    currentPage,
    perPage,
    pagination
  }
}
