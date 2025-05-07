<template>
  <div class="max-w-5xl mx-auto px-4 py-10 space-y-10">
    <h1 class="text-3xl font-bold text-green-600 text-center">Tus planes activos</h1>

    <div v-if="planes.length" class="grid gap-6">
      <div
        v-for="(plan, index) in planes"
        :key="index"
        class="border rounded-xl p-6 bg-white shadow-md hover:shadow-lg transition space-y-4"
      >
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 class="text-2xl font-semibold text-gray-800">{{ plan.nombre_plan }}</h2>
            <p class="text-sm text-gray-500">Tu nutricionista: <span class="font-medium text-gray-700">{{ plan.nombre_empleado }}</span></p>
            <p class="text-sm text-gray-500 font-bold" >Contacto: <span class="font-medium text-gray-700">{{ plan.email_empleado }}</span></p>
          </div>
          <span class="px-3 py-1 text-sm rounded-full font-semibold bg-green-100 text-green-700">
            {{ plan.status }}
          </span>
        </div>

        <div class="text-sm text-gray-600">
          <p>📅 Inicio: <strong>{{ plan.fecha_inicio }}</strong></p>
          <p>⏳ Fin: <strong>{{ plan.fecha_fin }}</strong></p>
        </div>

        <!-- 🔗 Acciones futuras -->
        <div class="flex flex-col md:flex-row gap-4 mt-4">
          <button
            class="w-full md:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition disabled:opacity-50"
            :disabled="!plan.plan_disenado_url"
          >
            📄 Ver plan diseñado
          </button>

          <button
            class="w-full md:w-auto px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold transition"
            @click="solicitarCita(plan)"
          >
            📅 Solicitar videollamada
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-gray-500 text-lg">
      Aún no tienes planes activos. Cuando actives uno, aparecerá aquí 😊
    </div>
  </div>
</template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue'
import api from '../api/axios'
  
  const planes = ref<any>([])
  const storedUser = localStorage.getItem('user')
  const user = storedUser ? JSON.parse(storedUser) : null
  const userId = user?.id_usuario ?? null
  
  onMounted(async () => {
    if (!userId) return
  
    try {
      const res = await api.get(`/usuarios/${userId}/planes-activos`)
      planes.value = res.data
    } catch (err) {
      console.error('Error cargando planes activos:', err)
    }

  })
  const solicitarCita = (plan) => {
  alert(`Próximamente podrás solicitar una videollamada para el plan: ${plan.nombre_plan}`)
}
  </script>
  