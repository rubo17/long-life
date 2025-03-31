<template>
    <section 
      class="relative h-128 flex items-center justify-center text-center bg-cover bg-center shadow-md" 
      style="background-image: url('/images/suscripciones.webp');"
    >
      <div class="relative z-10 max-w-2xl mx-auto p-6">
        <h1 class="text-3xl sm:text-5xl font-extrabold text-white">TRANSFORMA TU CUERPO Y TU VIDA PARA SIEMPRE</h1>
        <h2 class=" text-sm sm:text-lg text-white mt-2">
          Mírate y siéntete mejor con la plataforma que más casos de éxito consigue del mundo.
        </h2>
        <div class="mt-4">
            <a href="#suscripciones">
                <BotonComienzaTuCambio  class="mx-auto"/>
            </a>
        </div>
      </div>
    </section>

    <!-- Sección de suscripciones debajo del banner -->
    <section class="m-10">
      <Suscripciones id="suscripciones" />
    </section>
  </template>
  
  <script setup>
  import Suscripciones from '../components/Suscripciones.vue';
import BotonComienzaTuCambio from '../components/icons/BotonComienzaTuCambio.vue';
  </script>
  