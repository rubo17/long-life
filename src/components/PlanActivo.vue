<template>
  <div class="border rounded-xl p-6 bg-white shadow-md hover:shadow-lg transition space-y-4">
    
    <!-- Encabezado del plan -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h2 class="text-2xl font-semibold text-gray-800">{{ plan.nombre_plan }}</h2>
        <p class="text-sm text-gray-500">
          {{ plan.nombre_plan == "Plan de nutricion" ? "Tu nutricionista" : "Tu entrenador" }} 
          <span class="font-medium text-gray-700">{{ plan.nombre_empleado }}</span>
        </p>
        <p class="text-sm text-gray-500 font-bold">
          Contacto: <span class="font-medium text-gray-700">{{ plan.email_empleado }}</span>
        </p>
      </div>
      
      <!-- Estado del plan -->
      <span class="px-3 py-1 text-sm rounded-full font-semibold bg-green-100 text-green-700">
        {{ plan.status }}
      </span>
    </div>

    <!-- Fechas -->
    <div class="text-sm text-gray-600">
      <p>📅 Inicio: <strong>{{ plan.fecha_inicio }}</strong></p>
      <p>⏳ Fin: <strong>{{ plan.fecha_fin }}</strong></p>
    </div>

    <!-- Botones de planes y cita -->
    <div class="flex flex-col md:flex-row gap-4 mt-4">
      
      <!-- Botones para ver PDFs -->
      <div class="flex flex-col gap-2 w-full md:w-auto">
        <a
          v-for="(pdf, idx) in plan.planes_disenados"
          :key="idx"
          :href="`http://localhost/longLifeBack/public/${pdf.archivo}`"
          target="_blank"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition text-center"
        >
          📄 Ver plan {{ idx + 1 }}
        </a>
      </div>

      <!-- Botón si no hay planes diseñados -->
      <button
        v-if="!plan.planes_disenados.length"
        class="w-full md:w-auto px-4 py-2 bg-gray-300 text-gray-600 rounded-lg font-semibold transition cursor-not-allowed"
        disabled
      >
        📄 Plan no disponible aún
      </button>

      <!-- Botón para solicitar cita -->
      <button
        class="w-full md:w-auto px-4 py-2 text-white rounded-lg font-semibold transition"
        :class="plan.cita_pendiente ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'"
        :disabled="plan.cita_pendiente"
        @click="solicitarCita"
      >
        {{ plan.cita_pendiente ? '⏳ Cita pendiente' : '📅 Solicitar videollamada' }}
      </button>
    </div>

    <!-- Mensaje informativo si la cita está pendiente -->
    <p
      v-if="plan.cita_pendiente"
      class="text-sm text-gray-500 font-medium"
    >
      📭 Ya has solicitado una videollamada. Espera a que tu
      {{ plan.nombre_plan.includes('nutricion') ? 'nutricionista' : 'entrenador' }} la acepte.
    </p>
    
  </div>
</template>

<script setup lang="ts">
import { notify } from '@kyvg/vue3-notification';
import { format } from 'date-fns';
import api from '../api/axios';
const { plan } = defineProps<{ plan: any }>()


const solicitarCita = async () => {
  const storedUser = localStorage.getItem('user')
  const user = storedUser ? JSON.parse(storedUser) : null
  const idUsuario = user?.id_usuario ?? null

  if (!idUsuario) {
    alert('Usuario no autenticado.')
    return
  }
  const now = new Date()
  const fechaFormateada = format(now, 'yyyy-MM-dd HH:mm:ss') 

  try {
    await api.post('/citas/solicitar', {
      id_usuario: idUsuario,
      id_empleado: plan.id_empleado, 
      id_plan: plan.id_plan,
      fecha: fechaFormateada,
      mensaje: 'Solicitud automática desde el botón.'
    })
    plan.cita_pendiente = true

      notify({type: 'success',text: 'Videollamada solicitada correctamente'});            
    
  } catch (err) {
    console.error('Error al solicitar cita:', err)
      notify({type: 'error',text: 'Error al solicitar la videollamada'});            
  }
}
</script>
