<template>
  <div class="space-y-6">
    <form @submit.prevent="enviarFormulario" class="space-y-4 bg-white rounded-2xl shadow-md">
      <!-- Campos personales -->
      <div>
        <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre completo</label>
        <input type="text" id="nombre" v-model="direccion.nombre" class="w-full border rounded-md p-2 focus:ring focus:ring-green-200" required />
      </div>

      <div>
        <label for="telefono" class="block text-sm font-medium text-gray-700">Teléfono</label>
        <input type="tel" id="telefono" v-model="direccion.telefono" class="w-full border rounded-md p-2 focus:ring focus:ring-green-200" required />
      </div>
      <p v-if="errorTelefono" class="text-red-500">{{ errorTelefono }}</p>

      <!-- Dirección si es domicilio -->
      <div v-if="props.metodoEntrega === 'domicilio'">
        <label for="calle" class="block text-sm font-medium text-gray-700">Dirección</label>
        <input type="text" id="calle" v-model="direccion.calle" class="w-full border rounded-md p-2 focus:ring focus:ring-green-200" required />
      </div>

      <div v-if="props.metodoEntrega === 'domicilio'" class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <label for="ciudad" class="block text-sm font-medium text-gray-700">Ciudad</label>
          <input type="text" id="ciudad" v-model="direccion.ciudad" class="w-full border rounded-md p-2 focus:ring focus:ring-green-200" required />
        </div>
        <div class="flex-1">
          <label for="cp" class="block text-sm font-medium text-gray-700">Código postal</label>
          <input type="text" id="cp" v-model="direccion.cp" class="w-full border rounded-md p-2 focus:ring focus:ring-green-200" required />
        </div>
      </div>

      <div v-if="props.metodoEntrega === 'domicilio'">
        <label for="provincia" class="block text-sm font-medium text-gray-700">Provincia</label>
        <input type="text" id="provincia" v-model="direccion.provincia" class="w-full border rounded-md p-2 focus:ring focus:ring-green-200" required />
      </div>

      <div v-if="props.metodoEntrega === 'domicilio'">
        <label for="pais" class="block text-sm font-medium text-gray-700">País</label>
        <input type="text" id="pais" v-model="direccion.pais" class="w-full border rounded-md p-2 focus:ring focus:ring-green-200" required />
      </div>

      <!-- DNI -->
      <div>
        <label for="dni" class="block text-sm font-medium text-gray-700">DNI</label>
        <input type="text" id="dni" v-model="direccion.dni" class="w-full border rounded-md p-2 focus:ring focus:ring-green-200" required />
      </div>
      <p v-if="errorDni" class="text-red-500">{{ errorDni }}</p>

      <!-- Botón -->
      <div class="pt-2 text-center">
        <button type="submit" class="w-full cursor-pointer transition bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md shadow">
          Ir a pagar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { jwtDecode } from 'jwt-decode';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../api/axios';

const props = defineProps<{
  metodoEntrega: 'domicilio' | 'tienda',
  cupon: { codigo: string } | null
}>()

const direccion = ref({
  nombre: '',
  telefono: '',
  calle: '',
  ciudad: '',
  cp: '',
  provincia: '',
  pais: '',
  dni: ''
})

const errorTelefono = ref('')
const errorDni = ref('')
const carrito = ref<any[]>([])
const router = useRouter()

// Obtener carrito
const carritoGuardado = localStorage.getItem('productsInCart')
if (carritoGuardado) {
  try {
    const productosOriginales = JSON.parse(carritoGuardado)
    carrito.value = productosOriginales.map(producto => ({
      id: parseInt(producto.id_producto),
      qty: parseInt(producto.cantidad)
    }))
  } catch (error) {
    console.error('Error al procesar el carrito:', error)
  }
}

// Obtener user_id desde token
const token = localStorage.getItem('token')
let userId = null
if (token) {
  const decoded: any = jwtDecode(token)
  userId = decoded.sub
}

// Envío del formulario
const enviarFormulario = async () => {
  errorTelefono.value = ''
  errorDni.value = ''

  const telefonoRegex = /^(6|7|8|9)\d{8}$/
  const dniRegex = /^\d{8}[A-HJ-NP-TV-Z]$/

  if (!telefonoRegex.test(direccion.value.telefono)) {
    errorTelefono.value = 'Por favor, introduce un número de teléfono válido.'
    return
  }

  if (!dniRegex.test(direccion.value.dni)) {
    errorDni.value = 'Por favor, introduce un DNI válido.'
    return
  }

  try {
    const response = await api.post('/finalizarCompra/payment-intent', {
      cupon: props.cupon?.codigo ?? null, // ✅ Cupón reactivo
      items: carrito.value,
      customer: { ...direccion.value },
      metodo_entrega: props.metodoEntrega,
      user_id: userId
    })

    const clientSecret = response.data.clientSecret
    localStorage.setItem('clientSecret', clientSecret)
    router.push("/finalizarCompra/pago")

  } catch (error) {
    console.error('Error al crear el PaymentIntent:', error)
  }
}
</script>
