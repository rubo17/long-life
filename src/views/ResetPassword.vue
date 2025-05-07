<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-30 w-auto" src="/images/longlife.png" alt="Your Company">
        <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Recupera tu contraseña</h2>
      </div>
  
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form @submit.prevent="submit" class="space-y-6" action="#" method="POST">
          <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-900">Nueva contraseña</label>
            <div class="mt-2">
              <input
              v-model="password"
              type="password"
              id="password"
              required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  outline-1 outline-gray-300 focus:outline-2 focus:outline-green-500"
              placeholder="*****"
            />           
           </div>
          </div>
  
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm/6 font-medium text-gray-900">Repeat Password</label>
            </div>
            <div class="mt-2">
              <input
              v-model="confirmPassword"
              type="password"
              id="confirmPassword"
              required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  outline-1 outline-gray-300 focus:outline-2 focus:outline-green-500"
              placeholder="******"
            />    
           </div>
          </div>
  
          <div>
            <button type="submit" class="flex cursor-pointer w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Sign in</button>
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
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../api/axios'
  
  const route = useRoute()
  const router = useRouter()
  
  const password = ref('')
  const confirmPassword = ref('')
  
  const submit = async () => {
    if (password.value !== confirmPassword.value) {
      notify({ type: 'error', title: 'Las contraseñas no coinciden' })
      return
    }
    try {
      const token = route.params.token
      await api.post(`/resetPassword/${token}`, {
        password: password.value
      })
      notify({ type: 'success', title: 'Contraseña actualizada' })
      router.push('/login')
    } catch (error) {
      notify({ type: 'error', title: 'Error al cambiar la contraseña' })
    }
  }
  </script>
  