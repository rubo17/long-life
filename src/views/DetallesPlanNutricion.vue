<template>
  <div class="mt-20 w-full max-w-5xl mx-auto px-5 space-y-12 text-black">
    <!-- Encabezado -->
    <div class="text-center space-y-5">
      <h1 class="text-2xl md:text-3xl font-extrabold leading-relaxed">
        Empieza ya tu nuevo 
        <span class="text-green-500">Plan de nutrición 100% personalizado</span> 
        y acelera tu proceso de cambio físico de manera saludable
      </h1>
      <p class="text-blue-600 font-semibold text-lg">PLAN CREADO POR PROFESIONALES DE LA SALUD</p>
    </div>

    <!-- Contenido principal -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <!-- Sección de texto -->
      <div class="space-y-4 text-gray-700 text-lg">
        <p>Personalizamos tu plan en función del objetivo que quieres conseguir.</p>
        <p>Elige entre el <b>Plan BÁSICO</b> (seguimiento con formulario) o el <b>Plan PREMIUM</b> (te acompañamos cada mes con una videollamada).</p>
        <p>Menús cerrados, cantidades exactas, lista de la compra... Todo lo que necesitas para alcanzar tu objetivo físico de manera saludable.</p>
        <p>Con nuestras pautas personalizadas, ya no tendrás que preocuparte por qué comer cada día.</p>
        <p>Además, aprenderás cómo adaptar tus comidas en vacaciones, salidas con amigos o eventos especiales.</p>
        <a class="block bg-green-500 text-white text-center py-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition" href="#">
          Conseguir Plan →
        </a>
      </div>

      <!-- Imagen -->
      <div>
        <img src="/plan-nutricion.webp" alt="Plan de Nutrición" class="w-full rounded-xl shadow-xl">
      </div>
    </div>

    <!-- Pasos para arrancar -->
    <div class="text-center space-y-6 mb-10">
      <h2 class="text-2xl text-blue-500 font-bold flex items-center justify-center gap-3">
        Sigue estos pasos y arrancamos 
        <Fitness class="w-8 h-8 text-yellow-600"/>
      </h2>
      
      <div class="w-full mx-auto space-y-5 text-left">
        <!-- Paso 1 -->
        <div class="flex items-center gap-4 h-40 p-10 border-l-4 border-green-500 shadow-lg rounded-lg bg-gray-50">
          <span class="text-xl font-bold text-green-600">1.</span>
          <p class="text-lg">Elige en esta página tu Plan de Nutrición (<b>Básico</b> o <b>Premium</b>).</p>
        </div>

        <!-- Paso 2 -->
        <div class="flex items-center gap-4 h-40 p-10 border-l-4 border-green-500 shadow-lg rounded-lg bg-gray-50">
          <span class="text-xl font-bold text-green-600">2.</span>
          <p class="text-lg">Rellena lo antes posible el formulario que te vamos a pasar.</p>
        </div>

        <!-- Paso 3 -->
        <div class="flex items-center gap-4 h-40 p-10 border-l-4 border-green-500 shadow-lg rounded-lg bg-gray-50">
          <span class="text-xl font-bold text-green-600">3.</span>
          <p class="text-lg">Te mandamos tu Plan Personalizado por correo y tú te lo miras con calma para entender todo y plantearnos dudas 😎.</p>
        </div>

        <!-- Paso 4 (Solo Premium) -->
        <div class="flex items-center gap-4 h-40 p-10 border-l-4 border-blue-500 shadow-lg rounded-lg bg-gray-50">
          <span class="text-xl font-bold text-blue-600">4.</span>
          <p class="text-lg"><b>Sólo Plan Premium:</b> Agendas cita con nosotras y tenemos nuestra primera Videollamada, para explicarte tu plan y que preguntes lo que necesites.</p>
        </div>

        <!-- Paso 5 (Solo Premium) -->
        <div class="flex items-center gap-4 h-40 p-10 border-l-4 border-blue-500 shadow-lg rounded-lg bg-gray-50">
          <span class="text-xl font-bold text-blue-600">5.</span>
          <p class="text-lg"><b>Sólo Plan Premium:</b> Después, tendremos una Videollamada por mes para hacerte seguimiento y empujarte a tope hasta tu objetivo físico, apoyándote con tu alimentación.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Fitness from '../components/icons/Fitness.vue';
</script>
