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
      <div v-if="props.cupon" class="flex justify-between text-sm text-green-600">
        <span>Cupón aplicado</span>
        <span>-{{ props.cupon.tipo_descuento === 'porcentaje' ? props.cupon.descuento + '%' : props.cupon.descuento + ' €' }}</span>
     </div>
      <div class="flex justify-between items-center text-lg font-semibold text-gray-800">
        <span>Total</span>
        <span>{{ total }} €</span>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

// Tipado del carrito
interface CarritoItem {
  id_item: number
  nombre: string
  cantidad: number
  precio: number
}

// Definir props para recibir el cupón desde el padre
const props = defineProps<{
  cupon: { tipo_descuento: string; descuento: number } | null
}>()

// Carrito reactivo
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

// Calcular subtotal por producto
const calcularSubtotal = (item: CarritoItem) => {
  return (item.precio * item.cantidad).toFixed(2)
}

// Calcular total con posible cupón aplicado
const total = computed(() => {
  const subtotal = carrito.value.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  if (props.cupon) {
    if (props.cupon.tipo_descuento === 'porcentaje') {
      return (subtotal - subtotal * (props.cupon.descuento / 100)).toFixed(2)
    } else {
      return Math.max(subtotal - props.cupon.descuento, 0).toFixed(2)
    }
  }

  return subtotal.toFixed(2)
})
</script>

  