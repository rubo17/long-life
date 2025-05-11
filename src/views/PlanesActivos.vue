<template>
  <div class="max-w-5xl mx-auto px-4 py-10 space-y-10">
    <h1 class="text-3xl font-bold text-green-600 text-center">Tus planes activos</h1>

    <div v-if="planes.length" class="grid gap-6">
  <div v-for="plan in planes" :key="plan.id_plan">
    <PlanActivo :plan="plan" />
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
import PlanActivo from '../components/PlanActivo.vue'

  const planes = ref<any>([])
  const storedUser = localStorage.getItem('user')
  const user = storedUser ? JSON.parse(storedUser) : null
  const userId = user?.id_usuario ?? null
  
onMounted(async () => {
  if (!userId) return

  try {
    const res = await api.get(`/usuarios/${userId}/planes-activos`)
    const planesActivos = res.data

  for (const plan of planesActivos) {
    const resPlan = await api.get(`/planes-designed/${userId}/plan/${plan.id_plan}`)
    plan.planes_disenados = resPlan.data || [] 

    const resCita = await api.get(`/citas/estado/${userId}/${plan.id_plan}`)
    plan.cita_pendiente = resCita.data.estado === 'pendiente'
  }
    planes.value = planesActivos
  } catch (err) {
    console.error('Error cargando planes activos o diseñados:', err)
  }
})


  </script>
  