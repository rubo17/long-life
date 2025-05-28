<template>
    <div class="container mx-auto p-6 space-y-10">
      <h1 class="text-2xl font-bold mb-4">Ventas</h1>
  
      <div v-if="loading">Cargando ventas...</div>
  
      <BaseTable :columns="columns" :data="ventas" :showActions="true" >
        <template #actions="{ row }">
          <div class="flex gap-4">
            <button class="p-2 rounded-full hover:bg-gray-200 transition" @click="verDetalles(row)">
              <ViewDetails class="w-5 h-5 text-gray-600 hover:text-blue-500 cursor-pointer" />
            </button>
          </div>
        </template>
      </BaseTable>
  
      <Modal :open="showModal" @close="showModal = false">
  <h2 class="text-xl font-semibold mb-4">Detalles de la Venta</h2>

  <div v-if="ventaSeleccionada">
    <div class="space-y-2 mb-6">
      <p><strong>Cliente:</strong> {{ ventaSeleccionada.nombre }}</p>
      <p><strong>Total:</strong> €{{ ventaSeleccionada.total }}</p>
      <p><strong>Fecha:</strong> {{ ventaSeleccionada.fecha }}</p>
      <p><strong>Direccion: </strong>{{ ventaSeleccionada.direccion }}</p>
    </div>
    <!-- Select de estado -->
    <div class="mb-6">
      <label for="estado" class="block text-sm font-medium text-gray-700 mb-1">Estado del pedido</label>
      <select
        id="estado"
        v-model="ventaSeleccionada.estado"
        @change="() => actualizarEstado(ventaSeleccionada)"
        class="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-green-200 focus:outline-none"
      >
        <option value="pendiente">Pendiente</option>
        <option value="pagado">Pagado</option>
        <option value="en preparación">En preparación</option>
        <option value="enviado">Enviado</option>
        <option value="entregado">Entregado</option>
        <option value="cancelado">Cancelado</option>
        <option value="reembolsado">Reembolsado</option>
      </select>
    </div>

    <!-- Lista de productos -->
    <div>
      <h3 class="text-lg font-semibold mb-4">Productos:</h3>

      <!-- Lista de productos -->
      <div class="space-y-4 mb-6">
        <div
          v-for="detalle in ventaSeleccionada.detalles"
          :key="detalle.id"
          class="flex items-center gap-4 bg-gray-100 rounded-lg p-4 shadow-sm"
        >
          <img
            :src="detalle.imagen"
            alt="Imagen del producto"
            class="w-16 h-16 object-cover rounded-md border"
          />
          <div class="flex-1">
            <h4 class="font-medium text-gray-800">{{ detalle.nombre }}</h4>
            <p class="text-sm text-gray-600">Cantidad: {{ detalle.cantidad }}</p>
            <p class="text-sm text-gray-600">Precio unitario: €{{ detalle.precio_unitario }}</p>
            <p class="text-sm font-semibold text-gray-800 mt-1">
              Subtotal: €{{ (detalle.cantidad * detalle.precio_unitario).toFixed(2) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Resumen de totales -->
      <div class="bg-gray-50 p-4 rounded-lg shadow-sm  space-y-1">
        <p class="text-sm text-gray-700">
          Subtotal del pedido:
          <span class="font-semibold">€{{ ventaSeleccionada.subtotal.toFixed(2) }}</span>
        </p>

        <p v-if="ventaSeleccionada.descuento > 0" class="text-sm text-gray-700">
          Descuento
          <span v-if="ventaSeleccionada.cupon"> ({{ ventaSeleccionada.cupon }})</span>:
          <span class="font-semibold text-red-600">-€{{ ventaSeleccionada.descuento.toFixed(2) }}</span>
        </p>

        <p class="text-sm font-bold text-gray-900">
          Total pagado: €{{ ventaSeleccionada.total }}
        </p>
      </div>
    </div>

  </div>
</Modal>

     <Paginator
         :currentPage="currentPage"
         :totalPages="pagination.totalPages"
         @changePage="handlePageChange"
    />

    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue'
import BaseTable from '../../components/admin/ui/BaseTable.vue'
import Modal from '../../components/admin/ui/Modal.vue'
import ViewDetails from '../../components/icons/ViewDetails.vue'
import Paginator from '../../components/Paginator.vue'
import { useVentas } from '../../composables/api/admin/UseVentas'
  
  const { ventas, fetchVentas, loading,pagination,currentPage,getDetallesVenta,actualizarEstado } = useVentas()
  const showModal = ref(false);

  const ventaSeleccionada = ref<any>(null)
  
  onMounted(fetchVentas)
  
  function handlePageChange(page: number) {
  currentPage.value = page 
  fetchVentas()
}
const verDetalles = async (venta: any) => {
  const detalles = await getDetallesVenta(venta.id)
  console.log(venta)

  ventaSeleccionada.value = {
    ...venta,
    detalles
  }

  showModal.value = true
}
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'nombre', label: 'Cliente' },
    { key: 'total', label: 'Total (€)' },
    { key: 'estado', label: 'Estado' },
    { key: 'direccion', label: 'Direccion' },
    { key: 'fecha', label: 'Fecha' },
    { key: 'cupon', label: 'Cupon' }
  ]
  </script>
  