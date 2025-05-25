<template>
    <section class="bg-white">
      <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Contáctanos</h2>
        <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">
          ¿Tienes un problema técnico? ¿Quieres dar tu opinión sobre una función beta? ¿Necesitas información sobre nuestro plan de negocios? Escríbenos.
        </p>
        <form @submit.prevent="enviarFormulario" class="space-y-8">
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Tu correo electrónico</label>
            <input v-model="form.email" type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" placeholder="nombre@ejemplo.com" required>
          </div>
          <div>
            <label for="subject" class="block mb-2 text-sm font-medium text-gray-900">Asunto</label>
            <input v-model="form.asunto" type="text" id="subject" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500" placeholder="Cuéntanos cómo podemos ayudarte" required>
          </div>
          <div class="sm:col-span-2">
            <label for="message" class="block mb-2 text-sm font-medium text-gray-900">Tu mensaje</label>
            <textarea v-model="form.mensaje" id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Escribe tu mensaje aquí..." required></textarea>
          </div>
          <button type="submit" class="mx-auto block bg-green-500 rounded-2xl py-2 px-6 transition hover:bg-green-600 cursor-pointer">
            {{ loading ? 'Enviando...' : 'Enviar' }}
          </button>
        </form>
      </div>
    </section>
  </template>
  
  <script setup>
  import { notify } from '@kyvg/vue3-notification'
import { reactive, ref } from 'vue'
import api from '../api/axios'
  const form = reactive({
    email: '',
    asunto: '',
    mensaje: ''
  })
  const loading = ref(false)
  const enviarFormulario = async () => {
    loading.value = true
    try {
      await api.post('/contacto', {
        email: form.email,
        subject: form.asunto,
        message: form.mensaje
      })
      notify({
        text: "Mensaje enviado correctamente",
        type: "success"
      });
      form.email = ''
      form.asunto = ''
      form.mensaje = ''
    } catch (error) {
      alert('Ocurrió un error al enviar el mensaje')
      console.error(error)
    }
    loading.value = false
  }
  </script>
  