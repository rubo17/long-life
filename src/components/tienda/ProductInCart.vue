<template>
    <div class="space-y-6">
      <div
        v-for="product in products"
        :key="product.id_producto"
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4"
      >
        <div class="flex items-center gap-4">
          <img
            :src="product.imagen"
            alt=""
            class="w-24 h-24 object-cover rounded-md"
          />
          <div>
            <h2 class="text-lg font-semibold text-gray-800">{{ product.nombre }}</h2>
            <p class="text-gray-500 text-sm">Precio: {{ (parseFloat(product.precio) || 0).toFixed(2) }} €</p>
            <p class="text-gray-500 text-sm">
            Subtotal: {{ (parseFloat(product.precio) * parseInt(product.cantidad)).toFixed(2) }} €
            </p>
          </div>
        </div>
  
        <!-- Selector de cantidad -->
        <div class="flex items-center justify-between gap-3 sm:gap-6">
          <label for="cantidad" class="text-sm text-gray-600 hidden sm:block">Cantidad:</label>
          <input
            type="number"
            min="1"
            class="w-20 px-2 py-1 border rounded-md text-center"
            :value="product.cantidad"
            @change="(e: Event) => updateCantidad(product.id_producto, parseInt((e.target as HTMLInputElement).value))"
/>
          <!-- Botón eliminar -->
          <button  @click="removeFromCart(product.id_producto)" class="text-red-600 hover:text-red-800 cursor-pointer">
            <CrossIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
      <p class="text-red-500" v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
import { useCart } from '../../composables/api/carrito/UseCart';
import { Product } from '../../types/Product';
import CrossIcon from '../icons/CrossIcon.vue';
  
  const props = defineProps<{
    products: Product[]
  }>()
  
  const { removeFromCart, updateCantidad,error } = useCart();
  </script>
  