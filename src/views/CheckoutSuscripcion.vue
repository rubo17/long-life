<template>
    <div class="flex flex-col items-center justify-center p-4 bg-gray-50">
      <div class="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-8">
        <h2 class="text-2xl font-extrabold text-center mb-6">Finalizar Suscripción</h2>
  
        <div class="bg-[#1D1D1D] text-white rounded-xl p-6 mb-6">
          <p class="text-lg font-semibold">{{ planNameDisplay }}</p>
          <h3 class="text-3xl font-bold mt-2">{{ priceDisplay }}</h3>
          <p class="text-gray-300 mt-1 text-sm">{{ planConditions }}</p>
        </div>
  
        <form @submit.prevent="handleSubscribe">
          <div id="card-element" class="mb-6 p-3 border rounded"></div>
  
          <button
            type="submit"
            :disabled="loading || !clientSecret"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-2xl font-bold text-lg transition duration-300 cursor-pointer"
          >
            {{ loading ? 'Procesando...' : 'Confirmar Suscripción' }}
          </button>
        </form>
  
        <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthLogin } from '../composables/api/login/UseUserLogin'
  
  const stripePromise = loadStripe('pk_test_51REpfRFMywclhIX2fvMzezEH6oljCi0O3JNQ8zUNIK6KZn2UqKpVcD1FY3P7gJlJqC3TzlDIhFEuZZBrq29FsjNE00gN5Jwr06')
  
  const loading = ref(false)
  const error = ref('')
  const clientSecret = ref(null)
  
  let stripe = null
  let elements = null
  let cardElement = null
  
  const route = useRoute()
  const router = useRouter()
  
  const priceId = route.query.priceId
  const planName = route.query.planName
  const userId = Number(route.query.userId)
  const customerId = route.query.customerId
  const subscriptionId = ref(null) 

  const planNameDisplay = computed(() => {
    if (planName === 'Premium Anual') return 'Suscripción PREMIUM Anual'
    if (planName === 'Premium Mensual') return 'Suscripción PREMIUM Mensual'
    return 'Suscripción'
  })
  
  const priceDisplay = computed(() => {
    if (planName === 'Premium Anual') return '15,75 €/MES'
    if (planName === 'Premium Mensual') return '25 €/MES'
    return ''
  })
  
  const planConditions = computed(() => {
    if (planName === 'Premium Anual') return '*Pago único anual de 189€ (ahorras 111€)'
    if (planName === 'Premium Mensual') return '*Pago mes a mes'
    return ''
  })
  
  onMounted(async () => {
    try {
      stripe = await stripePromise
      elements = stripe.elements()
      cardElement = elements.create('card')
      cardElement.mount('#card-element')
  
      // Crear suscripción nada más cargar
      const response = await axios.post('http://localhost/longLifeBack/public/createSubscription', {
        id_usuario: userId,
        customer_id: customerId,
        price_id: priceId,
        plan_name: planName
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
  
      clientSecret.value = response.data.clientSecret
      subscriptionId.value = response.data.subscriptionId

  
      if (!clientSecret.value) {
        error.value = 'Error: No se pudo preparar la suscripción. Contacta con soporte.'
        console.error('clientSecret vacío.')
      }
  
    } catch (err) {
      console.error('Error creando suscripción:', err)
      error.value = 'Error al crear suscripción.'
    }
  })
  const { refreshAuth } = useAuthLogin(); // 👈 asegúrate de importar esto

  const handleSubscribe = async () => {
  loading.value = true
  error.value = ''

  if (!clientSecret.value) {
    error.value = 'No hay clientSecret para confirmar el pago.'
    loading.value = false
    return
  }

  try {
    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret.value, {
      payment_method: {
        card: cardElement
      }
    })

    if (stripeError) {
      console.error('Error en Stripe:', stripeError)
      error.value = stripeError.message
      loading.value = false
      return
    }

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      console.log('✅ Pago confirmado.')

      // 🚀 Actualizar el estado en la base de datos
      await axios.post('http://localhost/longLifeBack/public/updateSubscriptionStatus', {
        subscription_id: subscriptionId.value
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log('✅ Estado actualizado en base de datos.')

      const refresh = await axios.post('http://localhost/longLifeBack/public/auth/refreshToken', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (refresh.data.token) {
        localStorage.setItem('token', refresh.data.token)
        refreshAuth()
        console.log('✅ Token actualizado y sesión refrescada.')
      }

      console.log('✅ LocalStorage actualizado: esPremium = true');
      router.push('/suscripcion/success')
    } else {
      error.value = 'El pago no se completó correctamente. Inténtalo de nuevo.'
    }

  } catch (err) {
    console.error('Error general:', err)
    error.value = 'Error inesperado al procesar la suscripción.'
  }

  loading.value = false
}

  </script>
  