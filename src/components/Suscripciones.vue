<template>
  <div class="flex flex-col md:flex-row mt-12 gap-6 max-w-4xl mx-auto">
    <!-- Suscripción Anual -->
    <div class="bg-[#1D1D1D] p-6 rounded-lg shadow-md text-white text-center w-full md:w-1/2">
      <p class="text-green-600 font-semibold text-lg">
        Suscripción <span class="font-bold">PREMIUM</span> anual
      </p>
      <h1 class="font-extrabold text-3xl pt-2">
        15,75 € <span class="font-normal text-2xl">/MES</span>
      </h1>
      <h2 class="text-gray-400 pt-2">
        *Pago único anual de 189€ (ahorras 111)
      </h2>

      <button 
      :disabled="esPremium"
      @click="suscribirse('price_1RI4WBFMywclhIX2xIMjU0QY', 'Premium Mensual')"
      :class="[
        'font-bold rounded-2xl px-6 py-3 mt-4 w-full transition duration-300 ',
        esPremium 
          ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
          : 'bg-green-500 hover:bg-blue-600 text-white cursor-pointer'
      ]"
    >
      {{ esPremium ? 'Ya eres Premium' : 'PRUEBA 7 DÍAS GRATIS' }}
    </button>


      <p v-for="info in suscripcionInfo" class="text-left mt-5 flex gap-2  items-start">
        <Positivo class="text-[#155dfc] w-4 h-4" />
        <span class="flex-1">{{ info.descripcion }}</span>
      </p>

    </div>

    <!-- Suscripción Mensual -->
    <div class=" p-6 rounded-lg shadow-md border text-center w-full md:w-1/2">
      <p class="text-blue-600 font-semibold text-lg">
        Suscripción <span class="font-bold">PREMIUM</span> mensual
      </p>
      <h1 class="font-extrabold text-3xl pt-2">
        25 € <span class="font-normal text-2xl">/MES</span>
      </h1>
      <h2 class="text-gray-900 pt-2">
        *Paga mes a mes
      </h2>

      <button  
        :disabled="esPremium"
        @click="suscribirse('price_1RI4R9FMywclhIX2EVNExpZN', 'Premium Anual')"
        :class="[
          'font-bold rounded-2xl px-6 py-3 mt-4 w-full transition duration-300',
          esPremium 
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
            : 'bg-[#1D1D1D] hover:bg-blue-600 text-white cursor-pointer'
        ]"
      >
        {{ esPremium ? 'Ya eres Premium' : 'ME APUNTO' }}
    </button>

      

      <p v-for="(info, index) in suscripcionInfo" :key="index"
        class="text-gray-500 text-left mt-4 flex gap-2 items-start">
        <component :is="index === 0 ? CruzSuscripciones : Positivo" class="w-4 h-4"
          :class="index === 0 ? 'text-gray-500' : 'text-[#155dfc]'" />
        <span class="flex-1">{{ info.descripcion }}</span>
      </p>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthLogin } from '../composables/api/login/UseUserLogin';
import CruzSuscripciones from './icons/CruzSuscripciones.vue';
import Positivo from './icons/Positivo.vue';

const suscripcionInfo = [
  {
    descripcion: "Te ahorras 10 euros.",
  },
  {
    descripcion: "Acceso a contenido exclusivo, con entrenamientos y dietas realizadas por profesionales.",
  },
  {
    descripcion: "Acceso a estudios corporales.",
  },
  {
    descripcion: "Ofertas exclusivas en productos de la tienda.",
  }, {
    descripcion: "Comunidad privada para motivarte y no abandonar.",
  }
]
const router = useRouter()
const user = JSON.parse(localStorage.getItem('user') || '{}')
const esPremium = user?.esPremium === true

const {isLoggedIn}= useAuthLogin()

const suscribirse = (priceId, planName) => {
  console.log(isLoggedIn)
  if (isLoggedIn.value){
    router.push({ 
    name: 'CheckoutSuscripcion', 
    query: { 
      priceId, 
      planName, 
      userId: user.id_usuario,
      customerId: user.customer_id 
    } 
  })
  }else {
    router.push("/login")
  }

}
</script>