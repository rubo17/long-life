<template>
    <div class="flex items-center justify-center px-4">
      <div class="bg-white p-8 rounded-2xl  max-w-md text-center">
        <svg
          class="w-16 h-16 text-green-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h1 class="text-2xl font-semibold text-gray-800 mb-2">¡Gracias por tu compra!</h1>
        <p class="text-gray-600 mb-6">Tu pedido ha sido procesado correctamente.</p>
  
        <RouterLink to="/" class="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow">
          Volver al inicio
        </RouterLink>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // No necesitas lógica especial aquí, pero puedes añadir datos si quieres mostrar el ID de venta, por ejemplo.
  </script>
  