<template>
          <div class="w-full bg-white border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div class="flex flex-col lg:flex-row items-center gap-4">
          <img src="/images/nutricion.webp" class="w-full lg:w-1/2 rounded-lg" alt="Nutrición Personalizada">
          <div class="text-left">
            <h2 class="text-2xl font-bold mb-3">Nutrición Personalizada</h2>
            <p class="font-bold">
              Recibe un plan nutricional 100% adaptado a tus necesidades y/o patologías.
            </p>
            <p class="text-gray-500 mt-2">
              Nuestros nutricionistas te proporcionarán tu menú y herramientas concretas 
              para mejorar tu alimentación y conseguir tus objetivos.
            </p>
            <button @click="goToPlanNutricion" class="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition cursor-pointer">
              Más Información
            </button>
          </div>
        </div>
      </div>

</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
  const router = useRouter();

const goToPlanNutricion = () => {
  router.push('/detalles-plan-nutricion');
};
</script>