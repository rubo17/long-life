<template>
    <div class="min-h-screen p-4 sm:p-6 space-y-6">
      <h1 class="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-6">
        Resultados Corporales
      </h1>
  
      <div v-if="estudios.length" class="space-y-4">
        <!-- Mensaje general -->
        <p class="text-base sm:text-lg text-gray-600 text-center">
          {{ nombreUsuario }} de {{ edadUsuario }} años ha realizado {{ estudios.length }} estudios corporales.
        </p>
  
        <!-- Tabla de estudios en contenedor con scroll en móvil -->
        <div class="overflow-x-auto">
          <table class="w-full mt-4 table-auto border-collapse">
            <thead>
              <tr class="bg-green-500 text-white text-sm sm:text-base">
                <th class="p-2 border">Fecha</th>
                <th class="p-2 border">Peso (kg)</th>
                <th class="p-2 border">Altura (cm)</th>
                <th class="p-2 border">IMC</th>
                <th class="p-2 border">Cintura (cm)</th>
                <th class="p-2 border">Cadera (cm)</th>
                <th class="p-2 border">WHR</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="estudio in estudios"
                :key="estudio.id"
                class="text-center text-sm sm:text-base border-t"
              >
                <td class="p-2">{{ formatFecha(estudio.created_at) }}</td>
                <td class="p-2">{{ estudio.peso }}</td>
                <td class="p-2">{{ estudio.altura }}</td>
                <td class="p-2">{{ estudio.imc }}</td>
                <td class="p-2">{{ estudio.cintura ?? '-' }}</td>
                <td class="p-2">{{ estudio.cadera ?? '-' }}</td>
                <td class="p-2">{{ estudio.whr ?? '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <div v-else class="text-center text-gray-500">
        No tienes estudios corporales registrados aún.
      </div>
  
      <!-- Imagen adaptativa -->
      <div class="w-full flex flex-col md:flex-row justify-between items-center mt-8">
        <img src="/images/IMC.png" alt="Índice de Masa Corporal" class="max-w-full h-auto" />
        <ResultadosMetabolicos :estudios="estudios" />

      </div>
    </div>

  </template>
  
  <script setup lang="ts">
  import ResultadosMetabolicos from '../components/ResultadosMetabolicos.vue'
import { useResultadosEstudio } from '../composables/UseResultadosEstudio'

  const { estudios } = useResultadosEstudio()
  
  // Datos usuario
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const nombreUsuario = user?.nombre || 'Usuario'
  const edadUsuario = user?.edad || 'N/A'
  
  // Formatear fecha
  const formatFecha = (fecha: string) => {
    const date = new Date(fecha)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  </script>
  