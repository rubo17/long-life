<template>
    <div class="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 class="text-2xl font-semibold mb-4 text-gray-700">Lista de Productos</h2>
      
      <div v-if="loading" class="text-center text-gray-500">Cargando productos...</div>
      <div v-else-if="error" class="text-center text-red-500">Error al cargar los productos.</div>
      
      <table v-else class="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
        <thead>
          <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th class="py-3 px-6 text-left">Nombre</th>
            <th class="py-3 px-6 text-left">Descripción</th>
            <th class="py-3 px-6 text-left">Ingredientes</th>
            <th class="py-3 px-6 text-left">Precio</th>
            <th class="py-3 px-6 text-left">Stock</th>
            <th class="py-3 px-6 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody class="text-gray-700 text-sm font-light">
          <tr v-for="product in products" :key="product.id_producto" class="border-b border-gray-200 hover:bg-gray-100">
            <td class="py-3 px-6">{{ product.nombre }}</td>
            <td class="py-3 px-6">{{ product.meta_descripcion }}</td>
            <td class="py-3 px-6">{{ product.ingredientes }}</td>
            <td class="py-3 px-6">{{ product.precio }} €</td>
            <td class="py-3 px-6">{{ product.stock }}</td>
            <td class="py-3 px-6 text-center flex justify-center space-x-2">
              <button class="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600">Editar</button>
              <button class="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup lang="ts">
import { useProducts } from '../../composables/UseProducts.ts';

const { products, loading, error } = useProducts();

</script>