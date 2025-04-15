<template>
    <div>
      <CheckoutHeader />
  
      <main class="max-w-4xl mx-auto p-6">
        <RouterView /> <!-- Aquí cambia entre direccion, pago y resumen -->
      </main>
    </div>
  </template>

  <script setup lang="ts">
import CheckoutHeader from '../components/CheckoutHeader.vue';


</script>
  