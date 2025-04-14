<script setup lang="ts">
import MeditionIcon from '../components/icons/MeditionIcon.vue';
import Statistics from '../components/icons/Statistics.vue';
</script>

<template>
  <div class="container mx-auto px-4 py-12 mt-24 space-y-10">
    <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Mi Perfil</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Mis Actividades -->
      <div class="p-6 bg-white shadow-lg rounded-xl space-y-4">
        <h2 class="text-xl font-semibold text-gray-700 border-b-2 border-green-500 pb-2">🧘‍♀️ Mis Actividades</h2>
        <p class="text-gray-500 text-sm">Consulta y gestiona tus actividades diarias y entrenamientos registrados.</p>
      </div>

      <!-- Informe Corporal -->
      <div class="p-6 bg-white shadow-lg rounded-xl space-y-4">
        <h2 class="text-xl font-semibold text-gray-700 border-b-2 border-green-500 pb-2">📊 Estudio Corporal</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition cursor-pointer">
            <div>
              <p class="font-medium text-gray-700">Nueva Medición</p>
              <p class="text-sm text-gray-500">Registra tus medidas actuales</p>
            </div>
            <MeditionIcon class="w-6 h-6 text-green-500" />
          </div>
          <div class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition cursor-pointer">
            <div>
              <p class="font-medium text-gray-700">Mis Resultados</p>
              <p class="text-sm text-gray-500">Consulta tu historial corporal</p>
            </div>
            <Statistics class="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <!-- Contenido Personal -->
      <div class="p-6 bg-white shadow-lg rounded-xl space-y-4">
        <h2 class="text-xl font-semibold text-gray-700 border-b-2 border-green-500 pb-2">📚 Tu Contenido</h2>
        <p class="text-gray-500 text-sm">Accede a tus rutinas personalizadas, planes nutricionales y recursos exclusivos.</p>
      </div>

      <!-- Editar Perfil -->
      <div class="p-6 bg-white shadow-lg rounded-xl space-y-4">
        <h2 class="text-xl font-semibold text-gray-700 border-b-2 border-green-500 pb-2">⚙️ Editar Perfil</h2>
        <p class="text-gray-500 text-sm">Modifica tu información personal, contraseña y preferencias fácilmente.</p>
      </div>
    </div>
  </div>
</template>
