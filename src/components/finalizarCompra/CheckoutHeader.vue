<template>
  <header class="bg-white  shadow-lg py-4 px-6 flex items-center justify-between">
    <!-- Logo -->
     <div class="flex items-center gap-5 text-blue-500">
      <RouterLink class="" to="/">
        <img src="/images/longlife.png" alt="LongLife" class="h-20 w-20" />
      </RouterLink>
      <p>Pago Seguro</p>
     </div>

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
