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
          <p>Rutinas progresivas, ejercicios explicados, calendario de entrenamientos... Todo adaptado a ti.</p>
          <p>Con nuestras indicaciones, sabrás exactamente qué hacer en cada sesión para lograr resultados reales.</p>
          <p>También te ayudamos a mantener la motivación y adaptar los entrenamientos a tu estilo de vida.</p>
          <router-link
          v-if="!tienePlanActivo"
          class="block bg-red-500 text-white text-center py-4 rounded-lg text-lg font-semibold hover:bg-red-600 transition cursor-pointer"
          to="/conseguirPlan/2"
        >
        Adquirir Plan por 50 € →
      </router-link>

    <p v-else class="block bg-gray-500 text-white text-center py-4 rounded-lg text-lg font-semibold cursor-not-allowed">
      Ya tienes este plan activo 😊
    </p>        
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
      <p class="text-lg">
        Haz clic en <strong>"Conseguir este Plan"</strong> para iniciar el proceso y unirte al cambio que estás buscando.
      </p>
    </div>

    <!-- Paso 2 -->
    <div class="flex items-center gap-4 h-40 p-10 border-l-4 border-red-500 shadow-lg rounded-lg bg-gray-50">
      <span class="text-xl font-bold text-red-600">2.</span>
      <p class="text-lg">
        Completa el formulario con tus datos y realiza el pago de forma segura en nuestra plataforma.
      </p>
    </div>

    <!-- Paso 3 -->
    <div class="flex items-center gap-4 h-40 p-10 border-l-4 border-red-500 shadow-lg rounded-lg bg-gray-50">
      <span class="text-xl font-bold text-red-600">3.</span>
      <p class="text-lg">
        Recibe tu plan personalizado directamente en tu correo, adaptado a tus objetivos y necesidades.
      </p>
    </div>

    <!-- Paso 4 (Solo Premium) -->
    <div class="flex items-center gap-4 h-40 p-10 border-l-4 border-blue-500 shadow-lg rounded-lg bg-gray-50">
      <span class="text-xl font-bold text-blue-600">4.</span>
      <p class="text-lg">
       Podrás acceder a sesiones personalizadas por videollamada con tu entrenador para hacer seguimiento de tu progreso.
      </p>
    </div>
  </div>
</div>

  
      <!-- Mostrar entrenadores -->
          <div>
            <EmpleadoList tipoEmpleado="entrenador" titulo="entrenadores" />
         </div>

    </div>
  </template>
  
  <script setup lang="ts">
  import EmpleadoList from '../components/EmpleadosList.vue';

  import { onMounted } from 'vue';
import { usePlanes } from '../composables/api/UsePlanes';
  
  const storedUser = localStorage.getItem('user')
  const user = storedUser ? JSON.parse(storedUser) : null
  const userId: number | null = user?.id_usuario ?? null
  
  const idPlan: number = 2
  
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