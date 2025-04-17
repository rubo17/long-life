<template>
    <div>
      <CheckoutHeader />
  
      <main class="p-6">
        <RouterView /> <!-- Aquí cambia entre direccion, pago y resumen -->
      </main>
      <Footer v-if="!route.path.includes('/finalizarCompra/succes')" />
    </div>
  </template>

  <script setup lang="ts">
import { useRoute } from 'vue-router';
import CheckoutHeader from '../components/finalizarCompra/CheckoutHeader.vue';
import Footer from '../components/Footer.vue';
const route = useRoute();

</script>
  