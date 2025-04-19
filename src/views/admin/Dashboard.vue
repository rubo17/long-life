<template>
    <div class="container mx-auto px-6 py-10 space-y-10">
      <h1 class="text-3xl font-bold text-gray-800">Panel de Administración</h1>
  
      <!-- Tarjetas resumen -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div class="bg-white shadow-md rounded-lg p-4">
          <h2 class="text-sm font-semibold text-gray-500">Productos</h2>
          <p class="text-2xl font-bold text-indigo-600">{{ products.length }}</p>
        </div>
        <div class="bg-white shadow-md rounded-lg p-4">
          <h2 class="text-sm font-semibold text-gray-500">Usuarios</h2>
          <p class="text-2xl font-bold text-green-600">{{ users.length }}</p>
        </div>
        <div class="bg-white shadow-md rounded-lg p-4">
          <h2 class="text-sm font-semibold text-gray-500">Ventas</h2>
          <p class="text-2xl font-bold text-amber-500">€4,250</p>
        </div>
        <div class="bg-white shadow-md rounded-lg p-4">
          <h2 class="text-sm font-semibold text-gray-500">Pedidos pendientes</h2>
          <p class="text-2xl font-bold text-red-500">7</p>
        </div>
      </div>
  
      <!-- Gráfico / Actividad reciente -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Actividad reciente</h2>
        <ul class="text-sm text-gray-600 list-disc pl-5 space-y-2">
          <li>Nuevo producto añadido: Proteína Vegana</li>
          <li>Pedido #1023 marcado como enviado</li>
          <li>Usuario registrado: juan@gmail.com</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
import { onMounted } from 'vue';
import { useProductsAdmin } from '../../composables/api/admin/UseProductsAdmin';
import { useUsers } from '../../composables/api/admin/UseUsers';
const { products,fetchProducts } = useProductsAdmin() 
const {fetchUsers,users}= useUsers()

onMounted(() => {
  fetchProducts()
  fetchUsers()
})
</script>
  