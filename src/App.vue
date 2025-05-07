<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <!-- Solo muestra Header si NO estamos en /login -->

  <div class="min-h-screen leading-relaxed">
    <RouterView />
  </div>

  <!-- Solo muestra Footer si NO estamos en /login -->
</template>
