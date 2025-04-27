<template>
    <div class="flex flex-col items-center justify-center  bg-gray-50 p-6">
      <div class="bg-white rounded-2xl  p-10 max-w-md text-center">
        <div class="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mx-auto mb-6">
          <svg class="w-12 h-12 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
  
        <h1 class="text-2xl font-bold text-gray-800 mb-4">¡Suscripción completada!</h1>
        <p class="text-gray-600 mb-6">Gracias por confiar en nosotros. Ya tienes acceso a todo el contenido exclusivo.</p>
  
        <router-link to="/" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-2xl transition duration-300">
          Ir al inicio
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  