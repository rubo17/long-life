<template>
    <div class="w-full h-fit bg-white p-6 rounded-2xl shadow-xl space-y-4">
      <h2 class="text-xl font-bold text-gray-800 border-b pb-2">Resumen del pedido</h2>
  
      <div v-for="item in carrito" :key="item.id_item" class="text-sm text-gray-700">
        <div class="flex justify-between">
          <span>{{ item.nombre }} x {{ item.cantidad }}</span>
          <span>{{ calcularSubtotal(item) }} €</span>
        </div>
      </div>
  
      <hr />
  
      <div class="flex justify-between text-sm text-gray-600">
        <span>Coste de envío</span>
        <span class="text-green-600 font-medium">Gratis</span>
      </div>
  
      <div class="flex justify-between text-sm text-gray-500 italic">
        <span>IVA incluido</span>
        <span></span>
      </div>
  
      <hr />
  
      <div class="flex justify-between items-center text-lg font-semibold text-gray-800">
        <span>Total</span>
        <span>{{ total }} €</span>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  
  interface CarritoItem {
    id_item: number
    nombre: string
    cantidad: number
    precio: number
  }
  
  const carrito = ref<CarritoItem[]>([])
  
  onMounted(() => {
    const stored = localStorage.getItem('productsInCart')
    if (stored) {
      carrito.value = JSON.parse(stored).map((item: any) => ({
        ...item,
        cantidad: Number(item.cantidad),
        precio: Number(item.precio),
      }))
    }
  })
  
  const calcularSubtotal = (item: CarritoItem) => {
    return (item.precio * item.cantidad).toFixed(2)
  }
  
  const total = computed(() =>
    carrito.value.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toFixed(2)
  )
  </script>
  