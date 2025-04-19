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
  
      <Modal :open="mostrarModal" @close="mostrarModal = false">
        <h2 class="text-xl font-semibold mb-4">Detalles de la Venta</h2>
  
        <div v-if="ventaSeleccionada">
          <p><strong>Cliente:</strong> {{ ventaSeleccionada.nombre }}</p>
          <p><strong>Total:</strong> €{{ ventaSeleccionada.total }}</p>
          <p><strong>Estado:</strong> {{ ventaSeleccionada.estado }}</p>
          <p><strong>Fecha:</strong> {{ ventaSeleccionada.fecha }}</p>
  
          <div class="mt-4">
            <h3 class="font-bold mb-2">Productos:</h3>
            <ul class="list-disc ml-5 text-sm">
                <li v-for="detalle in ventaSeleccionada.detalles" :key="detalle.id">
                    {{ detalle.nombre }} (x{{ detalle.cantidad }}) - €{{ detalle.precio_unitario }}
                </li>
                </ul>
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
  
  const { ventas, fetchVentas, loading,pagination,currentPage,getDetallesVenta } = useVentas()
  
  const mostrarModal = ref(false)
  const ventaSeleccionada = ref<any>(null)
  

  
  onMounted(fetchVentas)
  
  function handlePageChange(page: number) {
  currentPage.value = page 
  fetchVentas()
}
const verDetalles = async (venta: any) => {
  const detalles = await getDetallesVenta(venta.id)

  ventaSeleccionada.value = {
    ...venta,
    detalles
  }

  mostrarModal.value = true
}
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'nombre', label: 'Cliente' },
    { key: 'total', label: 'Total (€)' },
    { key: 'estado', label: 'Estado' },
    { key: 'fecha', label: 'Fecha' }
  ]
  </script>
  