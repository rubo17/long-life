<template>
    <div class="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <h2 class="text-2xl font-bold text-center text-green-600">Completa tu ficha para tu plan personalizado</h2>
  
      <!-- Formulario usuario -->
      <form v-if="!clientSecret" @submit.prevent="enviarFormulario" class="space-y-6">
        <!-- Selección de plan -->
        <div>
          <label class="block font-semibold">Plan:</label>
          <select v-model="form.id_plan" class="w-full p-2 border rounded" required>
            <option disabled value="">-- Elige un plan --</option>
            <option :value="1">Plan Nutrición</option>
            <option :value="2">Plan Entrenamiento</option>
          </select>
        </div>
  
        <!-- Datos -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input v-model="form.edad" type="number" placeholder="Edad" class="p-2 border rounded w-full" required />
          <input v-model="form.peso" type="number" step="0.1" placeholder="Peso (kg)" class="p-2 border rounded w-full" required />
          <input v-model="form.altura" type="number" step="0.1" placeholder="Altura (cm)" class="p-2 border rounded w-full" required />
          <input v-model="form.gmail" type="email" placeholder="Correo electrónico" class="p-2 border rounded w-full" required />
        </div>
  
        <textarea v-model="form.objetivo" placeholder="Objetivo" class="w-full p-2 border rounded"></textarea>
        <textarea v-model="form.preferencias" placeholder="Preferencias o restricciones" class="w-full p-2 border rounded"></textarea>
        <textarea v-model="form.experiencia" placeholder="Experiencia previa" class="w-full p-2 border rounded"></textarea>
        <textarea v-model="form.observaciones" placeholder="Observaciones adicionales" class="w-full p-2 border rounded"></textarea>
  
        <button class="w-full py-3 bg-green-600 text-white font-bold rounded hover:bg-green-700">
          Ir al pago →
        </button>
      </form>
  
      <!-- Stripe Card Element -->
      <div v-if="clientSecret" class="space-y-6">
        <h1 class="text-lg font-bold text-center text-gray-700">
    Total a pagar: <span class="text-green-600">{{ (total / 100).toFixed(2) }} €</span>
  </h1>
          <h3 class="text-xl font-semibold text-center text-blue-600">Introduce tus datos de pago</h3>
        <form @submit.prevent="confirmarPago" class="space-y-4">
          <div id="card-element" class="p-4 border rounded"></div>
          <button class="w-full py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700">
            Confirmar y pagar
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { ref } from 'vue'
  
  let stripe
  let elements
  let card
  
  const userId = 1 // tu sistema de login
  const clientSecret = ref(null)
  const total = ref(0)

  const form = ref({
    id_plan: '',
    edad: '',
    peso: '',
    altura: '',
    gmail: '',
    objetivo: '',
    preferencias: '',
    experiencia: '',
    observaciones: ''
  })
  
  const enviarFormulario = async () => {
    try {
      const res = await axios.post('http://localhost/longLifeBack/public/planes/procesar', {
        ...form.value,
        id_usuario: userId
      })
      clientSecret.value = res.data.clientSecret
      total.value = res.data.amount 

      stripe = await loadStripe('pk_test_51REpfRFMywclhIX2fvMzezEH6oljCi0O3JNQ8zUNIK6KZn2UqKpVcD1FY3P7gJlJqC3TzlDIhFEuZZBrq29FsjNE00gN5Jwr06')
      elements = stripe.elements()
      card = elements.create('card')
      card.mount('#card-element')
    } catch (err) {
      alert('Error al enviar formulario')
      console.error(err)
    }
  }
  
  const confirmarPago = async () => {
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret.value, {
      payment_method: {
        card: card,
      },
    })
    if (error) {
      alert('Pago fallido: ' + error.message)
    } else if (paymentIntent.status === 'succeeded') {
        try {
    await axios.post('http://localhost/longLifeBack/public/planes/confirmar-pago', {
      paymentIntentId: paymentIntent.id
    })

    alert('¡Pago realizado y plan activado correctamente!')
    // Redirige o muestra mensaje de éxito final
  } catch (e) {
    console.error('Error al activar el plan:', e)
    alert('El pago fue correcto, pero hubo un error al registrar el plan.')
  }

    }
  }
  </script>
  