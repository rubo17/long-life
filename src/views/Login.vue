<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-30 w-auto" src="/images/longlife.png" alt="Your Company">
        <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      </div>
  
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form @submit.prevent="handleSubmit" class="space-y-6" action="#" method="POST">
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
            <p v-if="emailError" class="text-sm text-red-500 mt-1">{{ emailError }}</p>
           </div>
          </div>
  
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
              <div class="text-sm">
                <a href="#" class="font-semibold text-green-500 hover:text-green-400">Forgot password?</a>
              </div>
            </div>
            <div class="mt-2">
              <input
              v-model="password"
              type="password"
              id="password"
              required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  outline-1 outline-gray-300 focus:outline-2 focus:outline-green-500"
              placeholder="******"
            />    
            <p v-if="passwordError" class="text-sm text-red-500 mt-1">{{ passwordError }}</p>       
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
  import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/api/login/UseUserLogin'

  const router = useRouter()

  const email = ref('')
  const password = ref('')
  const emailError = ref('')
  const passwordError = ref('')
  const backendError = ref('')

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordRegex = /^.{6,}$/

  const { login, error, loading } = useAuth()

  const handleSubmit = async () => {
    emailError.value = ''
    passwordError.value = ''
    backendError.value = ''

    let valid = true

    if (!emailRegex.test(email.value)) {
      emailError.value = 'Introduce un email válido'
      valid = false
    }

    if (!passwordRegex.test(password.value)) {
      passwordError.value = 'La contraseña debe tener al menos 6 caracteres'
      valid = false
    }

    if (!valid) return

    await login(email.value, password.value)

    if (!error.value) {
      // Redireccionar si todo ha ido bien
      router.push('/')
    } else {
      backendError.value = error.value
    }
  }
</script>