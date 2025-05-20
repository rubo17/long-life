<template>
    <div class=" mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 class="text-lg font-bold mb-4">Pagar con tarjeta</h2>
  
      <form @submit.prevent="handleSubmit">
        <div id="card-element" class="mb-4 p-2 border rounded"></div>
  
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded cursor-pointer"
        >
          {{ loading ? 'Procesando...' : 'Pagar' }}
        </button>
      </form>
  
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    </div>
  </template>
  
  <script lang="ts" setup>

  import { loadStripe } from '@stripe/stripe-js'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../api/axios'
import { useCart } from '../../composables/api/carrito/UseCart'
  
  let stripe: any = null
  let elements: any = null
  let cardElement: any = null
  
  const loading = ref(false)
  const error = ref('')
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  const {clearCart}=useCart();
  const router = useRouter();
  onMounted(async () => {
    const clientSecret = localStorage.getItem('clientSecret')
    if (!clientSecret) {
      error.value = 'No se encontró el clientSecret.'
      return
    }
  
    stripe = await stripePromise
    elements = stripe.elements()
    cardElement = elements.create('card')
    cardElement.mount('#card-element')
  })
  
  const handleSubmit = async () => {
    loading.value = true
    error.value = ''
  
    const clientSecret = localStorage.getItem('clientSecret')
    if (!clientSecret) {
      error.value = 'clientSecret no encontrado.'
      loading.value = false
      return
    }
  
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: 'Nombre del cliente' // Aquí puedes usar datos reales
        }
      }
    })
  
    if (result.error) {
      error.value = result.error.message
    } else if (result.paymentIntent.status === 'succeeded') {
      try {
        await api.post('/finalizarCompra/payment', {
          paymentIntentId: result.paymentIntent.id
        })

        router.push('/finalizarCompra/succes') 
        localStorage.removeItem('clientSecret')
        localStorage.removeItem('cuponCode')
        localStorage.removeItem('cuponInfo')
        clearCart()


      } catch (e) {
        error.value = 'Error al actualizar el estado de la venta.'
      }
    }
  
    loading.value = false
  }
  </script>
  