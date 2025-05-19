<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-30 w-auto" src="/images/longlife.png" alt="Your Company">
        <h2 class=" text-center text-2xl/9 font-bold tracking-tight text-gray-900">Inicia Sesión</h2>
      </div>
  
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form @submit.prevent="handleSubmit" class="space-y-6" action="#" method="POST">
          <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-900">Direccion de Email</label>
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
                <RouterLink to="/forgotPassword" class="font-semibold text-green-500 hover:text-green-400">Forgot password?</RouterLink>
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
            <p v-if="error" class="text-sm text-red-500 mt-1">{{ error }}</p>     
           </div>
          </div>
  
          <div>
            <button type="submit" class="flex cursor-pointer w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Sign in</button>
          </div>
        </form>
        <div>
            <p class="mt-10 text-center text-sm/6 text-gray-500">
            Continua como invitado
            <RouterLink to="/" class="font-semibold text-blue-500 hover:text-blue-600">Click aqui</RouterLink>
          </p>
          <p class="mt-5 text-center text-sm/6 text-gray-500">
            No tienes una cuenta?
            <RouterLink to="/register" class="font-semibold text-green-500 hover:text-green-400">Registrate</RouterLink>
          </p>
        </div>  
      </div>
    </div>
  </template>

<script setup lang="ts">
  import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthLogin } from '../composables/api/login/UseUserLogin'
import { useRole } from '../composables/UseRole'

  const router = useRouter()

  const email = ref('')
  const password = ref('')
  const emailError = ref('')
  const passwordError = ref('')
  const backendError = ref('')

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordRegex = /^.{6,}$/

  const { login, error, loading } = useAuthLogin()

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
    const {  updateRole } = useRole();
    updateRole(); 

    if (!error.value) {
      // Redireccionar si todo ha ido bien
      router.push('/')
    } else {
      backendError.value = error.value
    }
  }
</script>