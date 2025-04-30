<template>
    <div class="container mx-auto p-6 space-y-10">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold mb-4">Suscripciones de Usuarios</h1>
      </div>
  
      <div v-if="loading" class="text-center">Cargando...</div>
  
      <div v-else>
        <BaseTable :columns="columns" :data="suscripciones" showActions>
          <template #actions="{ row }">
            <div class="flex gap-5">
              <!-- Aquí podrías poner acciones tipo "Cancelar suscripción" más adelante -->
              <button class="p-2 rounded-full hover:bg-gray-200 transition">
                <ViewDetails class="w-5 h-5 text-gray-600 hover:text-blue-500 cursor-pointer" />
              </button>
            </div>
          </template>
        </BaseTable>
  
        <Paginator
          :currentPage="currentPage"
          :totalPages="pagination.totalPages"
          @changePage="handlePageChange"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue'
import BaseTable from '../../components/admin/ui/BaseTable.vue'
import ViewDetails from "../../components/icons/ViewDetails.vue"
import Paginator from "../../components/Paginator.vue"
import { useSuscripciones } from '../../composables/api/admin/UseSubscriptions'
  const {
    suscripciones,
    loading,
    error,
    fetchSuscripciones,
    currentPage,
    pagination
  } = useSuscripciones()
  
  onMounted(fetchSuscripciones)
  
  function handlePageChange(page: number) {
    currentPage.value = page
    fetchSuscripciones()
  }
  
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'nombre_usuario', label: 'Usuario' },
    { key: 'plan_name', label: 'Plan' },
    { key: 'status', label: 'Estado' },
    { key: 'start_date', label: 'Inicio' },
    { key: 'cancel_at', label: 'Cancelación' }
  ]
  </script>
  