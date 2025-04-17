<template>
  <header class="bg-white  shadow-lg py-4 px-6 flex items-center justify-between">
    <!-- Logo -->
    <RouterLink class="flex items-center gap-5 text-blue-500" to="/">
      <img src="/images/longlife.png" alt="LongLife" class="h-10 w-auto" />
      <p>Pago seguro</p>
    </RouterLink>

    <!-- Botón opcional para volver -->
    <RouterLink
      to="/tienda"
      class="text-sm font-medium text-green-600 hover:underline"
    >
      ← Seguir comprando
    </RouterLink>
  </header>
</template>

<script setup lang="ts">
// No necesitas nada por ahora
</script>
