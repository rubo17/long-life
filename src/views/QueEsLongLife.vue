<template>
    <div class="w-full">
      <!-- HERO -->
      <section class="relative w-full h-screen">
  <img src="/hero.webp" alt="Fondo" class="w-full h-full object-cover absolute inset-0 -z-10">
  <div class="flex flex-col items-center justify-center h-full text-white text-center px-6 sm:px-8">
    <!-- Logo -->
    <img src="/longlife.png" alt="LongLife" class="w-32 sm:w-48 mb-6 sm:mb-8 transition-transform transform hover:scale-110">
    
    <!-- Título -->
    <h1 class="text-3xl sm:text-5xl font-extrabold drop-shadow-xl mb-6 sm:mb-8 leading-tight">
      ES MUCHO MÁS
    </h1>   
    
    <!-- Botón -->
    <RouterLink to="/" class="mt-8 sm:mt-12 inline-block px-8 py-3 ">
      <BotonComienzaTuCambio />
    </RouterLink>

    <!-- Flecha abajo -->
    <Flechaabajo class="w-10 mt-16 sm:mt-20 animate-bounce" />
  </div>
</section>
  
      <!-- SECCIÓN BENEFICIOS -->
      <section class="py-16 bg-gray-100 text-center">
        <h2 class="text-3xl font-bold text-gray-800">¿Por qué elegir LongLife?</h2>
        <p class="text-gray-600 mt-4 max-w-2xl mx-auto">
          Con nuestro programa de fitness y nutrición, transformarás tu vida con resultados reales y duraderos.
        </p>
        <div class="flex flex-wrap justify-center gap-8 mt-10">
          <div class="bg-white p-6 rounded-lg shadow-md w-72">
            <h3 class="text-lg font-bold text-green-600">Entrenamientos Personalizados</h3>
            <p class="text-gray-600 mt-2">Rutinas adaptadas a tu nivel y objetivos.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md w-72">
            <h3 class="text-lg font-bold text-green-600">Nutrición Inteligente</h3>
            <p class="text-gray-600 mt-2">Plan de alimentación diseñado por expertos.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md w-72">
            <h3 class="text-lg font-bold text-green-600">Seguimiento y Soporte</h3>
            <p class="text-gray-600 mt-2">Acompañamiento para maximizar tus resultados.</p>
          </div>
        </div>
      </section>
  
  
      <!-- SECCIÓN TESTIMONIOS -->
      <section class="py-16 bg-gray-100 text-center">
        <h2 class="text-3xl font-bold text-gray-800">Lo que dicen nuestros usuarios</h2>
        <div class="flex flex-wrap justify-center gap-8 mt-10">
          <div class="bg-white p-6 rounded-lg shadow-md w-72">
            <p class="text-gray-600">"Desde que empecé con LongLife, mi energía y motivación han aumentado. ¡Increíble!"</p>
            <h4 class="font-bold text-green-600 mt-4">Carlos M.</h4>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md w-72">
            <p class="text-gray-600">"La guía de entrenamientos y nutrición ha cambiado mi vida. ¡Recomiendo 100%!"</p>
            <h4 class="font-bold text-green-600 mt-4">Ana S.</h4>
          </div>
        </div>
      </section>
  
      <!-- SECCIÓN CTA FINAL -->
      <section class="py-16 bg-green-500 text-center text-white">
        <h2 class="text-3xl font-bold">¿Listo para empezar?</h2>
        <p class="text-lg mt-4">Únete a LongLife hoy mismo y transforma tu cuerpo y tu mente.</p>
        <button class="bg-white text-green-600 font-bold px-6 py-3 rounded-lg mt-6 
                       hover:bg-gray-100 transition duration-300 shadow-lg">
          HAZTE PREMIUM
        </button>
      </section>
    </div>
  </template>
  
  <script setup>
  import { RouterLink } from 'vue-router';
import BotonComienzaTuCambio from '../components/icons/BotonComienzaTuCambio.vue';
import Flechaabajo from '../components/icons/flechaabajo.vue';
  </script>
  