<template>
      <div class="flex flex-col md:flex-row mt-12 gap-6 max-w-4xl mx-auto">
    <!-- Suscripción Anual -->
    <div class="bg-[#1D1D1D] p-6 rounded-lg shadow-md text-white w-full md:w-1/2">
      <p class="text-green-600 font-semibold text-lg">
        Suscripción <span class="font-bold">PREMIUM</span> anual
      </p>
      <h1 class="font-extrabold text-3xl pt-2">
        15,75 € <span class="font-normal text-2xl">/MES</span>
      </h1>
      <h2 class="text-gray-400 pt-2">
        *Pago único anual de 189€ (ahorras 111)
      </h2>

      <button class="bg-green-500 text-white font-bold rounded-2xl px-6 py-3 mt-4 hover:bg-green-600 transition duration-300 w-full">
        PRUEBA 7 DÍAS GRATIS
      </button>

      <p v-for="info in suscripcionInfo" class="text-left mt-4 flex gap-2  items-center">
        <img src="../assets/TickAzul.svg" alt="" />
        {{ info.descripcion }}
    </p>

    </div>

    <!-- Suscripción Mensual -->
    <div class="bg-[#ada9a9] p-6 rounded-lg shadow-md border w-full md:w-1/2">
      <p class="text-blue-600 font-semibold text-lg">
        Suscripción <span class="font-bold">PREMIUM</span> mensual
      </p>
      <h1 class="font-extrabold text-3xl pt-2">
        25 € <span class="font-normal text-2xl">/MES</span>
      </h1>
      <h2 class="text-gray-900 pt-2">
        *Paga mes a mes
      </h2>

      <button class="bg-[#1D1D1D] text-white font-bold rounded-2xl px-6 py-3 mt-4 hover:bg-gray-600 transition duration-300 w-full">
        ME APUNTO
      </button>

      <p v-for="info in suscripcionInfo" class="text-gray-800 text-left mt-4 flex gap-2 items-center">
        <img src="../assets/TickAzul.svg" alt="" />
        {{ info.descripcion }}
      </p>
    </div>
  </div>
</template>

<script setup>
    const suscripcionInfo = [
        {
          descripcion: "Acceso ilimitado a la platadorma TODO EL AÑO. Los primeros 7 DIAS son GRATIS.",
        },
        {
          descripcion: "Acceso a contenido exclusivo, con entrenamientos y dietas realizadas por profesionales.",
        },
        {
          descripcion: "Acceso a estudios corporales.",
        },
        {
          descripcion: "Ofertas exclusivas en productos de la tienda.",
        },  {
          descripcion: "Comunidad privada para motivarte y no abandonar.",
        }, {
          descripcion: "Seguimiento personalizado en los planes que contrates.",
        },
      ]
</script>