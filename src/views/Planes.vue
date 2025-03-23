<template>
  <section class="mt-20 px-4 sm:px-8 lg:px-16 py-12 bg-gray-100 text-center">
    <h1 class="text-4xl font-extrabold text-gray-800 mb-8">
      Planes de <span class="text-green-500">LongLife</span>
    </h1>

    <div class="flex flex-col lg:flex-row gap-8  mx-auto">
      <!-- Plan Nutrición Personalizada -->
      <div class="w-full bg-white border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div class="flex flex-col lg:flex-row items-center gap-4">
          <img src="/nutricion.webp" class="w-full lg:w-1/2 rounded-lg" alt="Nutrición Personalizada">
          <div class="text-left">
            <h2 class="text-2xl font-bold mb-3">Nutrición Personalizada</h2>
            <p class="font-bold">
              Recibe un plan nutricional 100% adaptado a tus necesidades y/o patologías.
            </p>
            <p class="text-gray-500 mt-2">
              Nuestros nutricionistas te proporcionarán tu menú y herramientas concretas 
              para mejorar tu alimentación y conseguir tus objetivos.
            </p>
            <button class="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition">
              Más Información
            </button>
          </div>
        </div>
      </div>

      <!-- Plan Entrenamiento Personalizado -->
      <div class="w-full bg-white border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div class="flex flex-col lg:flex-row items-center gap-4">
          <img src="/entrenamiento.webp" class="w-full lg:w-1/2 rounded-lg" alt="Entrenamiento Personalizado">
          <div class="text-center">
            <h2 class="text-2xl font-bold mb-3">Entrenamiento Personalizado</h2>
            <p class="font-bold">
              Consigue una planificación de entrenamientos individualizada y 100% adaptada a tus necesidades.
            </p>
            <p class="text-gray-500 mt-2">
              Nuestros entrenadores te proporcionarán tu plan de entrenamiento y 
              te acompañarán en cada paso hacia tu objetivo físico.
            </p>
            <button class="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition">
              Más Información
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
