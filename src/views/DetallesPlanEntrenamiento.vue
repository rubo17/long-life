<template>
    <div class="mt-35 w-full max-w-5xl mx-auto px-5 space-y-12 text-black">
      <!-- Encabezado -->
      <div class="text-center space-y-5">
        <h1 class="text-2xl md:text-3xl font-extrabold leading-relaxed">
          Comienza hoy tu <span class="text-red-500">Plan de entrenamiento personalizado</span>
          y transforma tu físico con un enfoque profesional y progresivo.
        </h1>
        <p class="text-blue-600 font-semibold text-lg">PLAN DISEÑADO POR ENTRENADORES CERTIFICADOS</p>
      </div>
  
      <!-- Contenido principal -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <!-- Sección de texto -->
        <div class="space-y-4 text-gray-700 text-lg">
          <p>Creamos un plan de entrenamiento ajustado a tu nivel, experiencia y objetivos.</p>
          <p>Puedes elegir el <b>Plan BÁSICO</b> (rutina por correo) o el <b>Plan PREMIUM</b> (entrenamiento guiado con seguimiento por videollamada).</p>
          <p>Rutinas progresivas, ejercicios explicados, calendario de entrenamientos... Todo adaptado a ti.</p>
          <p>Con nuestras indicaciones, sabrás exactamente qué hacer en cada sesión para lograr resultados reales.</p>
          <p>También te ayudamos a mantener la motivación y adaptar los entrenamientos a tu estilo de vida.</p>
          <a class="block bg-red-500 text-white text-center py-4 rounded-lg text-lg font-semibold hover:bg-red-600 transition" href="#">
            Empezar Entrenamiento →
          </a>
        </div>
  
        <!-- Imagen -->
        <div>
          <img src="/images/plan-entrenamiento.png" alt="Plan de Entrenamiento" class="w-full rounded-xl shadow-xl">
        </div>
      </div>
  
      <!-- Pasos para arrancar -->
      <div class="text-center space-y-6 mb-10">
        <h2 class="text-2xl text-blue-500 font-bold flex items-center justify-center gap-3">
          Empieza tu transformación en 4 pasos 
        </h2>
        
        <div class="w-full mx-auto space-y-5 text-left">
          <!-- Paso 1 -->
          <div class="flex items-center gap-4 h-40 p-10 border-l-4 border-red-500 shadow-lg rounded-lg bg-gray-50">
            <span class="text-xl font-bold text-red-600">1.</span>
            <p class="text-lg">Selecciona el Plan de Entrenamiento ideal para ti: Básico o Premium.</p>
          </div>
  
          <!-- Paso 2 -->
          <div class="flex items-center gap-4 h-40 p-10 border-l-4 border-red-500 shadow-lg rounded-lg bg-gray-50">
            <span class="text-xl font-bold text-red-600">2.</span>
            <p class="text-lg">Completa el formulario que recibirás tras el pago para conocerte mejor.</p>
          </div>
  
          <!-- Paso 3 -->
          <div class="flex items-center gap-4 h-40 p-10 border-l-4 border-red-500 shadow-lg rounded-lg bg-gray-50">
            <span class="text-xl font-bold text-red-600">3.</span>
            <p class="text-lg">Te enviamos tu rutina personalizada directamente a tu correo electrónico.</p>
          </div>
  
          <!-- Paso 4 (Solo Premium) -->
          <div class="flex items-center gap-4 h-40 p-10 border-l-4 border-blue-500 shadow-lg rounded-lg bg-gray-50">
            <span class="text-xl font-bold text-blue-600">4.</span>
            <p class="text-lg">Tendrás sesiones por videollamada con tu entrenador asignado para seguir tu progreso.</p>
          </div>
        </div>
      </div>
  
      <!-- Mostrar entrenadores -->
          <div>
            <EmpleadosList tipoEmpleado="entrenador" titulo="entrenadores" />
         </div>

    </div>
  </template>
  
  <script setup>
    import EmpleadosList from '../components/EmpleadosList.vue';
  </script>
  