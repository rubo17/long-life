<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-30 w-auto" src="/images/longlife.png" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
        Register
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleRegister">
        <div>
          <label for="nombre" class="block text-sm font-medium text-gray-900">Nombre</label>
          <div class="mt-2">
            <input
              v-model="nombre"
              type="text"
              id="nombre"
              required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-green-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-900">Email</label>
          <div class="mt-2">
            <input
              v-model="email"
              type="email"
              id="email"
              required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-green-500 sm:text-sm"
            />
            <p v-if="emailError" class="text-sm text-red-500 mt-1">{{ emailError }}</p>
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-900">Password</label>
          <div class="mt-2">
            <input
              v-model="password"
              type="password"
              id="password"
              required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-green-500 sm:text-sm"
            />
            <p v-if="passwordError" class="text-sm text-red-500 mt-1">{{ passwordError }}</p>
          </div>
        </div>

        <p v-if="backendError" class="text-sm text-red-600 font-semibold">{{ backendError }}</p>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Registrarse
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        ¿Ya tienes una cuenta?
        <a href="/login" class="font-semibold text-green-500 hover:text-green-400">Inicia Sesión</a>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const nombre = ref('');
const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');
const backendError = ref('');
const router = useRouter();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^.{6,}$/;

const handleRegister = async () => {
  emailError.value = '';
  passwordError.value = '';
  backendError.value = '';

  let valid = true;


  if (!valid) return;

  try {
    const res = await axios.post('http://localhost/longLifeBack/public/auth/register', {
      nombre: nombre.value,
      email: email.value,
      password: password.value
    });

    const { token, user } = res.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    router.push('/'); // Redirige al home (o dashboard)

  } catch (err: any) {
    backendError.value =
      err.response?.data?.messages?.error ||
      err.response?.data?.message ||
      'Error al registrar';
  }
};
</script>