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
          <p class="text-2xl font-bold text-amber-500">€{{ totalVentas }}</p>
        </div>
        <div class="bg-white shadow-md rounded-lg p-4">
          <h2 class="text-sm font-semibold text-gray-500">Pedidos pendientes</h2>
          <p class="text-2xl font-bold text-red-500">7</p>
        </div>
        <div class="bg-white shadow-md rounded-lg p-4">
          <h2 class="text-sm font-semibold text-gray-500">Empleados</h2>
          <p class="text-2xl font-bold text-blue-500">{{ empleados.length }}</p>
        </div>
      </div>
  
    </div>
  </template>
  
  <script setup lang="ts">
import { onMounted, ref } from 'vue';
import api from '../../api/axios';
import { useEmpleados } from '../../composables/api/admin/UseEmpleados';
import { useProductsAdmin } from '../../composables/api/admin/UseProductsAdmin';
import { useUsers } from '../../composables/api/admin/UseUsers';
const { products,fetchProducts } = useProductsAdmin() 
const {fetchUsers,users}= useUsers()
const {empleados,fetchEmpleados}= useEmpleados()

onMounted(() => {
  fetchProducts()
  fetchUsers(),
  fetchTotalVentas()
  fetchEmpleados()
})
const totalVentas = ref()
const fetchTotalVentas = async () => {
  try {
    const res = await api.get('/ventasTotal');
    totalVentas.value = res.data.total;
  } catch (error) {
    console.error('Error al obtener el total de ventas:', error);
  }
};

</script>
  