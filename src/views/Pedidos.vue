<template>
    <div class="max-w-5xl mx-auto flex flex-col justify-center items-center py-6 px-4 space-y-6" v-if="pedidos.length==0">
      <p>Aun no has realizado ningun pedido</p>
      <RouterLink
        to="/perfil"
        class="inline-block px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
      >
        ← Volver
      </RouterLink>
    </div>
    <div v-else class="max-w-5xl mx-auto py-6 px-4 space-y-6">
      <h1 class="text-xl md:text-2xl font-bold text-gray-800">Mis Pedidos</h1>
  
      <div
        v-for="pedido in pedidos"
        :key="pedido.id"
        class="border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm bg-white space-y-4"
      >
        <!-- Cabecera -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-1 md:space-y-0">
          <div>
            <p class="text-sm text-gray-600">Pedido #{{ pedido.id }}</p>
            <p class="text-sm text-gray-500">Fecha: {{ formatFecha(pedido.fecha) }}</p>
          </div>
          <span
            :class="estadoClass(pedido.estado)"
            class="text-xs font-semibold px-3 py-1 rounded-full w-fit"
          >
            {{ pedido.estado.toUpperCase() }}
          </span>
        </div>
  
        <!-- Productos -->
        <div class="space-y-3">
          <div
            v-for="detalle in pedido.detalles"
            :key="detalle.id"
            class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-gray-100 rounded-md p-3"
          >
            <div class="flex gap-3 items-start sm:items-center">
              <img
                :src="detalle.imagen"
                alt="producto"
                class="w-20 h-20 object-cover rounded border"
              />
              <div>
                <p class="font-medium text-gray-800 text-sm sm:text-base">{{ detalle.nombre }}</p>
                <p class="text-sm text-gray-600">Cantidad: {{ detalle.cantidad }}</p>
                <p class="text-sm text-gray-600">Precio unitario: €{{ detalle.precio_unitario }}</p>
              </div>
            </div>
            <div class="text-sm font-semibold text-gray-800 sm:text-right">
              Subtotal: €{{ (detalle.cantidad * detalle.precio_unitario).toFixed(2) }}
            </div>
          </div>
        </div>
  
        <!-- Totales -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <span v-if="pedido.direccion && pedido.direccion.trim() !== ''"  class="text-sm text-gray-700">Plazo aproximado de entrega: 1 semana</span>
          <div class="font-bold text-gray-900 text-sm sm:text-base">
            Total: €{{ pedido.total }}
          </div>
        </div>
  
        <!-- Dirección -->
        <p v-if="pedido.direccion && pedido.direccion.trim() !== ''" class="text-sm font-bold break-words">
            Dirección de envío:
            <span class="text-blue-600">
                {{ pedido.direccion }}
            </span>
        </p>

        <p v-else class="text-sm font-bold break-words">
           Dirección de recogida:
            <span class="text-blue-600">
                Calle Artista Juan José Vento González
            </span>
        </p>

      </div>
      <Paginator
         :currentPage="currentPage"
         :totalPages="pagination.totalPages"
         @changePage="handlePageChange"
    />
  
  </div>
    
  </template>
  
  

  <script setup lang="ts">
import { jwtDecode } from 'jwt-decode'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import api from '../api/axios'
import Paginator from '../components/Paginator.vue'
  
  const pedidos = ref<any[]>([])
  const loading = ref(false)
  const currentPage = ref(1)
  const pagination = ref({
    totalPages: 1,
    total: 0
  })
  
  const token = localStorage.getItem('token')
  let userId = null
  
  if (token) {
    const decoded: any = jwtDecode(token)
    userId = decoded.sub
  }
  
  const fetchPedidos = async (page = 1) => {
    loading.value = true
    try {
      const response = await api.get(`/pedidos/${userId}?page=${page}&perPage=5`)
      pedidos.value = response.data.data
      pagination.value.totalPages = response.data.pagination.totalPages
      pagination.value.total = response.data.pagination.total
      currentPage.value = response.data.pagination.currentPage
    } catch (error) {
      console.error('Error al cargar los pedidos:', error)
    } finally {
      loading.value = false
    }
  }
  
  const handlePageChange = (page: number) => {
    fetchPedidos(page)
  }
  
  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }
  
  const estadoClass = (estado: string) => {
    switch (estado) {
      case 'pendiente': return 'bg-yellow-100 text-yellow-800'
      case 'pagado': return 'bg-blue-100 text-blue-800'
      case 'en preparación': return 'bg-orange-100 text-orange-800'
      case 'enviado': return 'bg-indigo-100 text-indigo-800'
      case 'entregado': return 'bg-green-100 text-green-800'
      case 'cancelado': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  
  onMounted(() => fetchPedidos())
  </script>
  