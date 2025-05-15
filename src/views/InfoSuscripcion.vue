<template>
  <div class="max-w-3xl mx-auto mt-35 p-8 rounded-2xl shadow-lg bg-gradient-to-br from-white to-gray-50 border">
    <h2 class="text-3xl font-extrabold text-center text-[#1D1D1D] mb-8">
      Estado de tu Suscripción Premium
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-lg">
      <div>
        <p class="font-bold">📦 Plan:</p>
        <p class="text-blue-700">{{ suscripcion?.nombre }}</p>
      </div>
      <div>
        <p class="font-bold">📅 Inicio:</p>
        <p>{{ formatFecha(suscripcion?.start_date) }}</p>
      </div>
      <div>
        <p class="font-bold">⏳ Estado:</p>
        <p :class="statusColor">{{ statusDisplay }}</p>
      </div>
      <div v-if="suscripcion?.cancel_at">
        <p class="font-bold">🛑 Se desactiva el:</p>
        <p>{{ formatFecha(suscripcion.cancel_at) }}</p>
      </div>
    </div>

    <div class="mt-10 text-center">
      <button
        v-if="suscripcion?.status === 'active'"
        @click="showModal=true"
        :disabled="loading"
        class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl text-lg transition cursor-pointer"
      >
        {{ loading ? 'Cancelando...' : 'Cancelar Suscripción' }}
      </button>

      <p v-if="mensaje" class="mt-4 text-green-600 font-semibold">{{ mensaje }}</p>
      <p v-if="error" class="mt-4 text-red-500 font-semibold">{{ error }}</p>
    </div>
    <Modal :open="showModal" @close="showModal=false">
        <h1>Hola</h1>
        <p>Si cancelas la suscripcion seguira activa hasta el {{ formatFecha(suscripcion.cancel_at) }} </p>
        <button
            v-if="suscripcion?.status === 'active'"
                @click="cancelarSuscripcion()"
                :disabled="loading"
                class="mt-10 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl text-lg transition cursor-pointer"
            >
            Confirmar Cancelación
      </button>
    </Modal>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import api from '../api/axios'
import Modal from '../components/admin/ui/Modal.vue'
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

onMounted(fetchSuscripcion)
</script>
