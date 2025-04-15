<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm text-center space-y-4">
        <img class="mx-auto h-30 w-auto" src="/images/longlife.png" alt="Your Company">
        <h2 class="mt-10  text-2xl/9 font-bold tracking-tight text-gray-900">Has olvidado tu contraseña?</h2>
        <p class="text-gray-500">Pon el gmail y te enviaremos un link para que que cambies tu contraseña</p>
      </div>
  
      <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form @submit.prevent="submit"  class="space-y-6" action="#" method="POST">
          <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
            <div class="mt-2">
              <input
              v-model="email"
              type="email"
              id="email"
              required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  outline-1 outline-gray-300 focus:outline-2 focus:outline-green-500"
              placeholder="correo@ejemplo.com"
            />           
           </div>
          </div>
  
          <div>
            <button type="submit" class="flex cursor-pointer w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">RESET PASSWORD</button>
          </div>
        </form>
  
        <p class="mt-10 text-center text-sm/6 text-gray-500">
          No tienes una cuenta?
          <a href="/register" class="font-semibold text-green-500 hover:text-green-400">Registrate</a>
        </p>
      </div>
    </div>
  </template>

<script setup lang="ts">
import { notify } from '@kyvg/vue3-notification'
import axios from 'axios'
import { ref } from 'vue'

const email = ref('')

const submit = async () => {
  try {
    const response = await axios.post('http://localhost/longLifeBack/public/forgotPassword', {
      email: email.value
    })
    notify({
      type: 'success',
      title: 'Revisa tu correo',
      text: response.data.message
    })
  } catch (error: any) {
    notify({
      type: 'error',
      title: 'Error',
      text: error.response?.data?.message || 'Error al enviar el correo'
    })
  }
}
</script>
