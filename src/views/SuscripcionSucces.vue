<template>
    <div class="flex flex-col items-center justify-center  bg-gray-50 p-6">
      <div class="bg-white rounded-2xl  p-10 max-w-md text-center">
        <div class="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mx-auto mb-6">
          <svg class="w-12 h-12 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
  
        <h1 class="text-2xl font-bold text-gray-800 mb-4">¡Suscripción completada!</h1>
        <p class="text-gray-600 mb-6">Gracias por confiar en nosotros. Ya tienes acceso a todo el contenido exclusivo.</p>
  
        <router-link to="/" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-2xl transition duration-300">
          Ir al inicio
        </router-link>
      </div>
    </div>
  </template>
  <script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../api/axios'
import { useAuthLogin } from '../composables/api/login/UseUserLogin'

const route = useRoute()
const router = useRouter()

const error = ref('')
const success = ref(false)
const {refreshAuth}= useAuthLogin();
  onMounted(async () => {
  const sessionId = route.query.session_id

  if (!sessionId) {
    error.value = 'No se pudo obtener la sesión de Stripe.'
    return
  }

  try {
    const response = await api.post('/confirmCheckoutSubscription', {
      session_id: sessionId
    }, {
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.data.status === 'success') {
        const refresh = await api.post('/auth/refreshToken', {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        if (refresh.data.token) {
          localStorage.setItem('token', refresh.data.token)
          refreshAuth()
          console.log('✅ Token actualizado y sesión refrescada.')
        }
      
      } else {
      error.value = 'Error al confirmar suscripción'
    }

  } catch (err) {
    console.error(err)
    error.value = 'Error inesperado'
  }

})

  </script>
  