<template>
    <div class="w-64 min-h-screen bg-gray-800 text-white">
      <div class="px-6 py-4">
        <h1 class="text-lg flex flex-1 gap-2  items-center font-semibold">Admin Panel <img class="w-20 h-20" src="/images/longlife.png" alt=""></h1>
      </div>
      <ul class="mt-8 space-y-5">
        <li class="py-2 px-4 hover:bg-gray-700">
          <router-link to="/admin" class="text-lg">Dashboard</router-link>
        </li>
        <li class="py-2 px-4 hover:bg-gray-700">
          <router-link to="/admin/users" class="text-lg">Usuarios</router-link>
        </li>
        <li class="py-2 px-4 hover:bg-gray-700">
          <router-link to="/admin/products" class="text-lg">Productos</router-link>
        </li>
        <li class="py-2 px-4 hover:bg-gray-700">
          <router-link to="#" class="text-lg">Planes</router-link>
        </li>
        <li class="py-2 px-4 hover:bg-gray-700">
          <router-link to="#" class="text-lg">Suscripciones</router-link>
        </li>
        <li class="py-2 px-4 hover:bg-gray-700">
          <router-link to="#" class="text-lg">Configuraciones</router-link>
        </li>
        <li class="py-2 px-4 hover:bg-gray-700">
          <router-link to="/" class="text-lg">Volver</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  </style>
  