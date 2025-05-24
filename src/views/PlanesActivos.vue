<template>
  <div v-if="!loading" class="max-w-5xl mx-auto px-4 py-10 space-y-10">
    <div class="flex justify-end">
      <button v-if="planes.length"
        class="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition cursor-pointer"
        @click="abrirModalCitas"
      >
         <span>Ver mis citas</span>
      </button>
    </div>
    <div class="flex justify-center items-center gap-4">
      <RouterLink to="/perfil">
          <FlechaAtras class="w-8 h-8 text-blue-500"/>
      </RouterLink>
      <h1 class="text-xl md:text-4xl font-extrabold text-green-600 text-center">Tus planes activos</h1>
    </div>

    <div v-if="planes.length" class="grid gap-6">
      <div v-for="plan in planes" :key="plan.id_plan">
        <PlanActivo :plan="plan" />
      </div>
    </div>

    <div v-else class="text-center text-gray-500 text-lg italic">
      Aún no tienes planes activos. Cuando actives uno, aparecerá aquí 
    </div>
  </div>

  <div v-else class="flex items-center justify-center h-screen w-full">
    <Loading />
  </div>

  <Modal :open="showModalCitas" @close="showModalCitas = false">
    <template #default>
      <div class="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
        <h2 class="text-2xl font-bold text-gray-800 border-b pb-2">Tus citas con tu profesional</h2>

        <div v-if="cargandoCitas" class="text-gray-500 animate-pulse">Cargando citas...</div>

        <div v-else-if="citas.length === 0" class="text-gray-500">No tienes citas registradas.</div>

        <div v-else class="space-y-4">
          <div
            v-for="cita in citas"
            :key="cita.id"
            class="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
          >
            <p class="text-sm text-gray-700 leading-relaxed">
              <strong> Fecha:</strong> {{ formatDate(cita.fecha) }}<br>
              <strong> Profesional:</strong> {{ cita.nombre_empleado }}<br>
              <strong> Plan:</strong> {{ cita.nombre_plan }}<br>
              <strong> Mensaje:</strong> {{ cita.mensaje || 'Sin mensaje' }}<br>
              <strong> Estado:</strong> 
              <span :class="estadoClass(cita.estado)" class="font-semibold capitalize">
                {{ cita.estado }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

  
  <script setup lang="ts">
  import { notify } from '@kyvg/vue3-notification'
import { format } from 'date-fns'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import api from '../api/axios'
import PlanActivo from '../components/PlanActivo.vue'
import Modal from '../components/admin/ui/Modal.vue'
import FlechaAtras from '../components/icons/FlechaAtras.vue'
import Loading from '../components/loading.vue'

  const planes = ref<any>([])
  const storedUser = localStorage.getItem('user')
  const user = storedUser ? JSON.parse(storedUser) : null
  const userId = user?.id_usuario ?? null
  const loading = ref(true)
  
onMounted(async () => {
  if (!userId) return

  try {
    const res = await api.get(`/usuarios/${userId}/planes-activos`)
    const planesActivos = res.data

    const hoy = new Date()

    for (const plan of planesActivos) {
      // 🔄 Verificar vencimiento
      const fechaFin = new Date(plan.fecha_fin)
      console.log("fecha hoy: " + hoy)
      console.log("fecha fin: " + plan.fecha_fin)
      if (fechaFin < hoy) {
        try {
          await api.post('/planes/cancelar', {
            id_usuario: userId,
            id_plan: plan.id_plan
          })
          console.log(` Plan ${plan.nombre_plan} finalizado por fecha vencida`)
          continue 
        } catch (cancelError) {
          console.error(' Error al cancelar plan vencido:', cancelError)
        }
      }

      const resPlan = await api.get(`/planes-designed/${userId}/plan/${plan.id_plan}`)
      plan.planes_disenados = resPlan.data || []

      const resCita = await api.get(`/citas/estado/${userId}/${plan.id_plan}`)
      plan.estado_cita = resCita.data.estado
    }

    planes.value = planesActivos.filter(p => new Date(p.fecha_fin) >= hoy)

    loading.value = false
  } catch (err) {
    console.error('Error cargando planes activos o diseñados:', err)
  }
})
const showModalCitas = ref(false);
const citas = ref<any>([]);
const cargandoCitas = ref(false);

const abrirModalCitas = async () => {
  showModalCitas.value = true;
  cargandoCitas.value = true;

  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user?.id_usuario) {
    notify({ type: 'error', text: 'Usuario no autenticado' });
    return;
  }

  try {
    const response = await api.get(`/citas/usuario/${user.id_usuario}`);
    citas.value = response.data;
  } catch (err) {
    notify({ type: 'error', text: 'Error al obtener las citas' });
  } finally {
    cargandoCitas.value = false;
  }
};

const formatDate = (fecha: string) => {
  return format(new Date(fecha), "dd/MM/yyyy HH:mm");
};

const estadoClass = (estado: string) => {
  switch (estado) {
    case 'pendiente':
      return 'text-yellow-600 font-semibold';
    case 'aceptada':
      return 'text-green-600 font-semibold';
    case 'rechazada':
      return 'text-red-600 font-semibold';
    default:
      return 'text-gray-600';
  }
};


  </script>
  