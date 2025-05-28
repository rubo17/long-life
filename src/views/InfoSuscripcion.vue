<template>
  <div class="p-5 sm:p-8 max-w-xl mx-auto mt-40 rounded-2xl shadow-md bg-white ">
    <div class="flex gap-4 justify-center items-center">
      <RouterLink to="/perfil" class="flex items-center gap-2 text-blue-600 hover:underline mb-4">
        <FlechaAtras class="w-6 h-6" />
      </RouterLink>
        <h2 class="text-xl sm:text-3xl text-center font-bold text-gray-900 mb-6">
          Estado de tu Suscripción Premium
       </h2>
    </div>

    <div class="space-y-5 text-gray-700 text-base sm:text-lg">
      <div class="flex justify-between">
        <span class="font-semibold">📦 Plan:</span>
        <span class="text-blue-600">{{ suscripcion?.nombre }}</span>
      </div>
      <div class="flex justify-between">
        <span class="font-semibold">📅 Inicio:</span>
        <span>{{ formatFecha(suscripcion?.start_date) }}</span>
      </div>
      <div class="flex justify-between">
        <span class="font-semibold">⏳ Estado:</span>
        <span :class="statusColor">{{ statusDisplay }}</span>
      </div>

      <div class="flex justify-between">
        <span class="font-semibold">
          {{ suscripcion?.cancel_at ? '🛑 Se desactiva el:' : '🔁 Renovación el:' }}
        </span>
        <span>
          {{ suscripcion?.cancel_at ? formatFecha(suscripcion.cancel_at) : calcularRenovacion() }}
        </span>
      </div>
    </div>

    <div class="mt-8 text-center">
      <button
        v-if="suscripcion?.status === 'active'"
        @click="showModal = true"
        :disabled="loading"
        class="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-xl text-base sm:text-lg transition"
      >
        {{ loading ? 'Cancelando...' : 'Cancelar Suscripción' }}
      </button>

      <p v-if="mensaje" class="mt-4 text-green-600 font-semibold">{{ mensaje }}</p>
      <p v-if="error" class="mt-4 text-red-500 font-semibold">{{ error }}</p>
    </div>

    <!-- Modal de confirmación -->
    <Modal :open="showModal" @close="showModal = false">
      <div class="p-6 sm:p-8 text-center">
        <h3 class="text-xl font-bold text-gray-800 mb-4">¿Seguro que deseas cancelar?</h3>
        <p class="text-gray-600 mb-6">
          Tu suscripción seguirá activa hasta el <strong>{{ fechaCancelacionCalculada(suscripcion) }}</strong>.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <button
            @click="cancelarSuscripcion()"
            :disabled="loading"
            class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-lg"
          >
            Confirmar Cancelación
          </button>
          <button
            @click="showModal = false"
            class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-5 rounded-lg"
          >
            Volver
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>


<script setup>
import { computed, onMounted, ref } from 'vue'
import api from '../api/axios'
import Modal from '../components/admin/ui/Modal.vue'
import FlechaAtras from '../components/icons/FlechaAtras.vue'
const user = JSON.parse(localStorage.getItem('user') || '{}')
const suscripcion = ref(null)
const loading = ref(true)
const error = ref('')
const mensaje = ref('')

const formatFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString('es-ES')
}
const showModal = ref(false)

// Mostrar texto amigable según estado
const statusDisplay = computed(() => {
  if (!suscripcion.value) return ''

  if (suscripcion.value.status === 'canceling') {
    return `Cancelada, activa hasta ${formatFecha(suscripcion.value.cancel_at)}`
  }

  if (suscripcion.value.status === 'active') {
    return 'Activa'
  }

  return suscripcion.value.status
})
function fechaCancelacionCalculada(suscripcion) {
  if (!suscripcion || !suscripcion.start_date) return '';

  const fechaInicio = new Date(suscripcion.start_date);
  const esMensual = suscripcion.nombre === 'Premium mensual';

  // Sumar 1 mes o 1 año
  const nuevaFecha = new Date(fechaInicio);
  if (esMensual) {
    nuevaFecha.setMonth(nuevaFecha.getMonth() + 1);
  } else {
    nuevaFecha.setFullYear(nuevaFecha.getFullYear() + 1);
  }

  return formatFecha(nuevaFecha); // asumiendo que esta función ya formatea la fecha
}

const fetchSuscripcion = async () => {
  loading.value = true
  try {
    const response = await api.post('/infoSuscripcion', {
      id_usuario: user.id_usuario
    })

    if (response.data.status === 'success') {
      suscripcion.value = response.data.suscripcion
    }
  } catch (err) {
    console.error(err)
    error.value = 'No se pudo cargar la información de la suscripción.'
  } finally {
    loading.value = false
  }
}

const cancelarSuscripcion = async () => {
    showModal.value=false
  loading.value = true
  error.value = ''
  mensaje.value = ''
  try {
    const response = await api.post('/cancelarSuscripcion', {
      id_usuario: user.id_usuario
    })

    if (response.data.status === 'success') {
      mensaje.value = 'La suscripción se cancelará al final del periodo actual.'
      await fetchSuscripcion()
    } else {
      error.value = 'Error al cancelar la suscripción.'
    }
  } catch (err) {
    console.error(err)
    error.value = 'Error inesperado al cancelar.'
  } finally {
    loading.value = false
  }
}
const calcularRenovacion = () => {
  if (!suscripcion.value) return null

  const inicio = new Date(suscripcion.value.start_date)
  const tipo = suscripcion.value.nombre?.toLowerCase() || ''

  if (tipo.includes('mensual')) {
    inicio.setMonth(inicio.getMonth() + 1)
  } else if (tipo.includes('anual')) {
    inicio.setFullYear(inicio.getFullYear() + 1)
  }

  return formatFecha(inicio)
}

onMounted(fetchSuscripcion)
</script>
