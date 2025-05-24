<template>
  <div class="mt-35 w-full max-w-5xl mx-auto px-5 space-y-12 text-black mb-10">
    <!-- Encabezado -->
     <RouterLink to="/planes">
        <FlechaAtras class="w-8 h-8 text-blue-500"/>
     </RouterLink>
    <div class="text-center space-y-5">
      <h1 class="text-xl md:text-3xl font-extrabold leading-relaxed">
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
        <p>Menús cerrados, cantidades exactas, lista de la compra... Todo lo que necesitas para alcanzar tu objetivo físico de manera saludable.</p>
        <p>Con nuestras pautas personalizadas, ya no tendrás que preocuparte por qué comer cada día.</p>
        <p>Además, aprenderás cómo adaptar tus comidas en vacaciones, salidas con amigos o eventos especiales.</p>
        <router-link
          v-if="!tienePlanActivo"
          class="block bg-green-500 text-white text-center py-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition cursor-pointer"
          to="/conseguirPlan/1"
        >
        Adquirir Plan por 50 € →
      </router-link>

    <p v-else class="block bg-gray-500 text-white text-center py-4 rounded-lg text-lg font-semibold cursor-not-allowed">
      Ya tienes este plan activo 😊
    </p>
      </div>

      <div>
        <img src="/images/plan-nutricion.webp" alt="Plan de Nutrición" class="w-full rounded-xl shadow-xl">
      </div>
    </div>

    <div class="text-center space-y-6 mb-10">
      <h2 class="text-2xl text-blue-500 font-bold flex items-center justify-center gap-3">
        Sigue estos pasos y arrancamos 
        <Fitness class="w-8 h-8 text-yellow-600"/>
      </h2>
      
      <div class="w-full mx-auto space-y-5 text-left">
        <div class="flex items-center gap-4 h-40 p-10 border-l-4 border-green-500 shadow-lg rounded-lg bg-gray-50">
          <span class="text-xl font-bold text-green-600">1.</span>
          <p class="text-lg">Elige en esta página el Plan de Nutrición.</p>
        </div>

        <div class="flex items-center gap-4 h-40 p-10 border-l-4 border-green-500 shadow-lg rounded-lg bg-gray-50">
          <span class="text-xl font-bold text-green-600">2.</span>
          <p class="text-lg">Rellena lo antes posible el formulario despues de realizar el pago.</p>
        </div>

        <div class="flex items-center gap-4 h-40 p-10 border-l-4 border-green-500 shadow-lg rounded-lg bg-gray-50">
          <span class="text-xl font-bold text-green-600">3.</span>
          <p class="text-lg">Te mandamos tu Plan Personalizado por correo y tú te lo miras con calma para entender todo y plantearnos dudas 😎.</p>
        </div>

        <div class="flex items-center gap-4 h-40 p-10 border-l-4 border-blue-500 shadow-lg rounded-lg bg-gray-50">
          <span class="text-xl font-bold text-blue-600">4.</span>
          <p class="text-lg"> Podras tener videollamados con el nutricionista que se te haya asignado.</p>
        </div>
      </div>
    </div>
    <div>
      <EmpleadoList tipoEmpleado="nutricionista" titulo="nutricionistas" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import EmpleadoList from '../components/EmpleadosList.vue';
import FlechaAtras from '../components/icons/FlechaAtras.vue';
import { usePlanes } from '../composables/api/UsePlanes';

const storedUser = localStorage.getItem('user')
const user = storedUser ? JSON.parse(storedUser) : null
const userId: number | null = user?.id_usuario ?? null

const idPlan: number = 1 

const { tienePlanActivo, verificarPlanActivo } = usePlanes()

onMounted(async () => {
  if (userId) {
    await verificarPlanActivo(userId, idPlan)
    console.log("plan (tras verificar):", tienePlanActivo.value)
  } else {
    console.log("No hay userId")
  }
})

</script>
