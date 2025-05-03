<template>
          <div class="w-full bg-white border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div class="flex flex-col lg:flex-row items-center gap-4">
          <img src="/images/entrenamiento.webp" class="w-full lg:w-1/2 rounded-lg" alt="Entrenamiento Personalizado">
          <div class="text-left">
            <h2 class="text-2xl font-bold mb-3">Entrenamiento Personalizado</h2>
            <p class="font-bold">
              Consigue una planificación de entrenamientos individualizada y 100% adaptada a tus necesidades.
            </p>
            <p class="text-gray-500 mt-2">
              Nuestros entrenadores te proporcionarán tu plan de entrenamiento y 
              te acompañarán en cada paso hacia tu objetivo físico.
            </p>
            <button @click="goToPlanEntrenamiento" class="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition cursor-pointer">
              Más Información
            </button>
          </div>
        </div>
      </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
  const router = useRouter();

const goToPlanEntrenamiento = () => {
  router.push('/detalles-plan-entrenamiento');
};
</script>