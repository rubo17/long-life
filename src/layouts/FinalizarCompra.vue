<template>
    <div>
      <CheckoutHeader />
      <div class="w-full px-4 pt-6">
    <div class="flex items-center justify-between max-w-4xl mx-auto">
      <div class="">
        <div :class="circleClass(1)">✔</div>
        <div :class="lineClass(2)" />
      </div>
      <div class="">
        <div :class="circleClass(2)">2</div>
        <div :class="lineClass(3)" />
      </div>
      <div class="">
        <div :class="circleClass(3)">3</div>
      </div>
    </div>

    <div class="flex justify-between text-sm font-medium text-center max-w-4xl mx-auto mt-2 text-black ">
      <span>Dirección</span>
      <span>Método de Pago</span>
      <span>Resumen</span>
    </div>
  </div>
      <main class="p-6">
        <RouterView /> <!-- Aquí cambia entre direccion, pago y resumen -->
      </main>
      <Footer v-if="!route.path.includes('/finalizarCompra/succes')" />
    </div>
  </template>

  <script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import CheckoutHeader from '../components/finalizarCompra/CheckoutHeader.vue';
import Footer from '../components/Footer.vue';
const route = useRoute();

// Detectar paso actual según la ruta
const pasoActual = computed(() => {
  if (route.path.includes('/finalizarCompra/direccion')) return 1
  if (route.path.includes('/finalizarCompra/pago')) return 2
  if (route.path.includes('/finalizarCompra/success') || route.path.includes('/finalizarCompra/resumen')) return 3
  return 1
})

// Estilo para los círculos (paso actual o completado)
const circleClass = (step: number) => {
  return [
    'w-8 h-8 rounded-full flex items-center justify-center text-white font-bold',
    pasoActual.value >= step ? 'bg-black' : 'bg-gray-300'
  ]
}

// Estilo para las líneas entre pasos
const lineClass = (nextStep: number) => {
  return [
    'h-1 flex-1 mx-2',
    pasoActual.value >= nextStep ? 'bg-black' : 'bg-gray-300'
  ]
}
</script>
  