<template>
  <section class="mt-20 px-4 sm:px-8 lg:px-16 py-12 bg-gray-100 text-center">
    <h1 class="text-4xl font-extrabold text-gray-800 mb-8">
      Planes de <span class="text-green-500">LongLife</span>
    </h1>

    <div class="flex flex-col lg:flex-row gap-8  mx-auto">
      <!-- Plan Nutrición Personalizada -->
      <PlanNutricion/>
      <!-- Plan Entrenamiento Personalizado -->
      <PlanEntrenamiento/>
    </div>
  </section>
</template>

<script setup>
import PlanEntrenamiento from '../components/PlanEntrenamiento.vue';
import PlanNutricion from '../components/PlanNutricion.vue';

</script>