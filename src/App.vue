<script setup>
import { useRoute } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

const route = useRoute();
</script>

<template>
  <!-- Solo muestra Header si NO estamos en /login -->
  <Header v-if="!['/login', '/register'].includes(route.path)" />

  <div class="mt-30 min-h-screen">
    <RouterView />
  </div>

  <!-- Solo muestra Footer si NO estamos en /login -->
  <Footer v-if="!['/login', '/register'].includes(route.path)" />
</template>
