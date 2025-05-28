// src/composables/api/admin/useCategorias.ts

import { notify } from '@kyvg/vue3-notification'
import { ref } from 'vue'
import api from '../../../api/axios'

export function useCategoriasAdmin() {
  const categorias = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const currentPage = ref(1)
  const perPage = ref(10)

  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    total: 0
  })

  const categoriaSeleccionada = ref(null)

  const fetchCategorias = async () => {
    loading.value = true
    try {
      const response = await api.get('/category_products', {
        params: {
          page: currentPage.value,
          perPage: perPage.value
        }
      })
      categorias.value = response.data.data
      pagination.value = response.data.pagination
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al cargar categorías'
    } finally {
      loading.value = false
    }
  }

  const getCategoria = async (idCategoria: number) => {
    try {
      const response = await api.get(`/category_products/${idCategoria}`)
      return response.data
    } catch (error) {
      console.error('Error al obtener la categoría:', error)
      return null
    }
  }

const crearCategoria = async (nuevaCategoria: { nombre: string; descripcion: string }) => {
  try {
    await api.post('/category_products', 
      {
        nombre: nuevaCategoria.nombre,
        descripcion: nuevaCategoria.descripcion
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    notify({ type: 'success', title: 'Categoría creada correctamente' })
    fetchCategorias()
  } catch (err: any) {
    const message = err.response?.data?.messages?.errors
      ? Object.values(err.response.data.messages.errors).join(', ')
      : 'Error al crear categoría'
    notify({ type: 'error', title: message })
  }
}


  const actualizarCategoria = async (categoria: any) => {
    try {
      await api.put(`/category_products/${categoria.id_categoria}`, categoria)
      notify({ type: 'success', title: 'Categoría actualizada correctamente' })
      fetchCategorias()
    } catch (err) {
      notify({ type: 'error', title: 'Error al actualizar categoría' })
    }
  }

  const eliminarCategoria = async (idCategoria: number) => {
    try {
      await api.delete(`/category_products/${idCategoria}`)
      notify({ type: 'success', title: 'Categoría eliminada correctamente' })
      fetchCategorias()
    } catch (err) {
      const message = err.response?.data?.messages.message || 'Error al eliminar categoría'
      notify({ type: 'error', title: message })
    }
  }

  return {
    categorias,
    loading,
    error,
    currentPage,
    perPage,
    pagination,
    fetchCategorias,
    getCategoria,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
    categoriaSeleccionada,
  }
}
