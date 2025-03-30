<template>
    <div class="w-64 h-full bg-gray-800 text-white fixed top-0 left-0">
      <div class="px-6 py-4">
        <h1 class="text-2xl font-semibold">Admin Panel</h1>
      </div>
      <ul class="mt-8">
        <li class="py-2 px-4 hover:bg-gray-700">
          <router-link to="/admin" class="text-lg">Dashboard</router-link>
        </li>
        <li class="py-2 px-4 hover:bg-gray-700">
          <router-link to="/admin/users" class="text-lg">Usuarios</router-link>
        </li>
        <li class="py-2 px-4 hover:bg-gray-700">
          <router-link to="/admin/planes" class="text-lg">Planes</router-link>
        </li>
        <li class="py-2 px-4 hover:bg-gray-700">
          <router-link to="/admin/suscripciones" class="text-lg">Suscripciones</router-link>
        </li>
        <li class="py-2 px-4 hover:bg-gray-700">
          <router-link to="/admin/settings" class="text-lg">Configuraciones</router-link>
        </li>
        <li class="py-2 px-4 hover:bg-gray-700">
          <router-link to="/inicio" class="text-lg">Cerrar sesión</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  </style>
  