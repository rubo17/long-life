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
      <p> Inicio: <strong>{{ plan.fecha_inicio }}</strong></p>
      <p> Fin: <strong>{{ plan.fecha_fin }}</strong></p>
    </div>

    <!-- Botones -->
    <div class="flex flex-col md:flex-row gap-4 mt-4">
      <!-- Ver PDFs -->
    <button
      v-if="plan.planes_disenados.length"
      class="px-4 py-2 bg-gray-100 text-blue-600 hover:underline rounded-lg font-semibold transition text-center cursor-pointer"
      @click="mostrarModalPlanes = true"
    >
      📁 Ver todos los archivos de plan
    </button>
      <!-- Botón si no hay planes -->
      <button
        v-if="!plan.planes_disenados.length"
        class="w-full md:w-auto px-4 py-2 bg-gray-300 text-gray-600 rounded-lg font-semibold transition cursor-not-allowed"
        disabled
      >
         Plan no disponible aún
      </button>

      <!-- Botón para abrir modal -->
      <button
        class="w-full md:w-auto px-4 py-2 text-white rounded-lg font-semibold transition "
        :class="plan.cita_pendiente ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600 cursor-pointer'"
        :disabled="plan.cita_pendiente"
        @click="showModal = true"
      >
        {{ plan.cita_pendiente ? ' Cita pendiente' : ' Solicitar videollamada' }}
      </button>
    </div>

    <!-- Mensaje si ya hay cita -->
    <p
      v-if="plan.cita_pendiente"
      class="text-sm text-gray-500 font-medium"
    >
       Ya has solicitado una videollamada. Espera a que tu
      {{ plan.nombre_plan.includes('nutricion') ? 'nutricionista' : 'entrenador' }} la acepte.
    </p>

    <!-- Modal para confirmar solicitud -->
<Modal :open="showModal" @close="showModal = false">
  <template #default>
    <div class="p-4 space-y-4">
      <h2 class="text-xl font-semibold">Confirmar solicitud de videollamada</h2>

      <label class="block text-sm text-gray-700 font-medium">
        Selecciona fecha y hora:
        <Datepicker 
          v-model="fechaSeleccionada"
          :is-24="true" 
          :enable-time-picker="true"
          :min-date="new Date()"
          :auto-apply="true"
          :teleport="true"
        />
      </label>

      <label class="block text-sm text-gray-700 font-medium">
        Mensaje (opcional):
        <textarea
          v-model="mensaje"
          rows="3"
          class="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-yellow-500 resize-none"
          placeholder="Escribe un mensaje para tu profesional..."
        ></textarea>
      </label>

      <div class="flex items-center gap-4">
        <button
          class="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg cursor-pointer"
          @click="solicitarCita"
        >
          Confirmar solicitud
        </button>
        <button
          class="text-gray-500 hover:underline cursor-pointer"
          @click="showModal = false"
        >
          Cancelar
        </button>
      </div>
    </div>
  </template>
</Modal>
<Modal :open="mostrarModalPlanes" @close="mostrarModalPlanes = false">
  <template #default>
    <div class="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
      <h2 class="text-xl font-semibold text-gray-800">Todos los planes adjuntos</h2>
      <ul class="space-y-2">
        <li v-for="(pdf, idx) in plan.planes_disenados" :key="idx">
          <a
          :href="`${BASE_URL}/${pdf.archivo}`"
            target="_blank"
            class="text-blue-600 hover:underline"
          >
            📄 Archivo {{ idx + 1 }}
          </a>
        </li>
      </ul>
      <button class="text-gray-500 hover:underline cursor-pointer" @click="mostrarModalPlanes = false">
        Cerrar
      </button>
    </div>
  </template>
</Modal>


  </div>
</template>

<script setup lang="ts">
import { notify } from '@kyvg/vue3-notification';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { format } from 'date-fns';
import { ref, watch } from 'vue';
import api from '../api/axios';
import Modal from './admin/ui/Modal.vue';

const { plan } = defineProps<{ plan: any }>();
const showModal = ref(false);
const mensaje = ref("")
const fechaSeleccionada = ref<Date | null>(new Date());
const mostrarModalPlanes = ref(false);
const BASE_URL = import.meta.env.VITE_API_URL;
const solicitarCita = async () => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const idUsuario = user?.id_usuario ?? null;

  if (!idUsuario) {
    alert('Usuario no autenticado.');
    return;
  }

  const fechaFormateada = format(fechaSeleccionada.value!, 'yyyy-MM-dd HH:mm:ss');
  if (!fechaSeleccionada.value) {
    notify({ type: 'warn', text: 'Por favor, selecciona una fecha y hora para la cita.' });
    return;
  }
  try {
    await api.post('/citas/solicitar', {
      id_usuario: idUsuario,
      id_empleado: plan.id_empleado,
      id_plan: plan.id_plan,
      fecha: fechaFormateada,
      mensaje: mensaje.value
    });

    plan.cita_pendiente = true;
    showModal.value = false;
    notify({ type: 'success', text: 'Videollamada solicitada correctamente' });

  } catch (err) {
    console.error('Error al solicitar cita:', err);
    notify({ type: 'error', text: 'Error al solicitar la videollamada' });
  }
  const resetModal = () => {
  mensaje.value = '';
  fechaSeleccionada.value = new Date();
};

  watch(showModal, (nuevoValor) => {
    if (!nuevoValor) resetModal();
  });
  
};

</script>
