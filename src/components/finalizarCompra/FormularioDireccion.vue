<template>
        <div class="space-y-6">
    
            <form @submit.prevent="enviarFormulario" class="space-y-4 bg-white rounded-2xl shadow-md">
              <div>
                <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre completo</label>
                <input type="text" id="nombre" v-model="direccion.nombre" class="w-full border rounded-md p-2 focus:ring focus:ring-green-200" required />
              </div>
    
              <div >
                <label for="telefono" class="block text-sm font-medium text-gray-700">Teléfono</label>
                <input type="tel" id="telefono" v-model="direccion.telefono" class="w-full border rounded-md p-2 focus:ring focus:ring-green-200" required />
              </div>
    
              <div v-if="props.metodoEntrega === 'domicilio'">
                <label for="calle" class="block text-sm font-medium text-gray-700">Dirección</label>
                <input type="text" id="calle" v-model="direccion.calle" class="w-full border rounded-md p-2 focus:ring focus:ring-green-200" required />
              </div>
    
              <div  v-if="props.metodoEntrega === 'domicilio'" class="flex flex-col sm:flex-row gap-4">
                <div class="flex-1">
                  <label for="ciudad" class="block text-sm font-medium text-gray-700">Ciudad</label>
                  <input type="text" id="ciudad" v-model="direccion.ciudad" class="w-full border rounded-md p-2 focus:ring focus:ring-green-200" required />
                </div>
                <div class="flex-1">
                  <label for="cp" class="block text-sm font-medium text-gray-700">Código postal</label>
                  <input type="text" id="cp" v-model="direccion.cp" class="w-full border rounded-md p-2 focus:ring focus:ring-green-200" required />
                </div>
              </div>
    
              <div  v-if="props.metodoEntrega === 'domicilio'">
                <label for="provincia" class="block text-sm font-medium text-gray-700">Provincia</label>
                <input type="text" id="provincia" v-model="direccion.provincia" class="w-full border rounded-md p-2 focus:ring focus:ring-green-200" required />
              </div>
    
              <div  v-if="props.metodoEntrega === 'domicilio'">
                <label for="pais" class="block text-sm font-medium text-gray-700">País</label>
                <input type="text" id="pais" v-model="direccion.pais" class="w-full border rounded-md p-2 focus:ring focus:ring-green-200" required />
              </div>
              <div>
                <label for="dni" class="block text-sm font-medium text-gray-700">Dni</label>
                <input type="text" id="dni" v-model="direccion.dni" class="w-full border rounded-md p-2 focus:ring focus:ring-green-200" required />
              </div>
    
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
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../api/axios';

const props = defineProps<{
  metodoEntrega: 'domicilio' | 'tienda'
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
const carrito = ref<any>()

onMounted(() => {
  const carritoGuardado = localStorage.getItem('productsInCart')
  if (carritoGuardado) {
    console.log(carritoGuardado)
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
  console.log(carrito.value)

})

const router = useRouter();

const token = localStorage.getItem('token')
let userId = null

if (token) {
  const decoded: any = jwtDecode(token)
  userId = decoded.sub 
}
const enviarFormulario = async () => {
  console.log('Dirección enviada:', direccion.value)

  try {
    const response = await api.post('/finalizarCompra/payment-intent', {
      items: carrito.value,
      customer: {
        nombre: direccion.value.nombre,
        telefono: direccion.value.telefono,
        calle: direccion.value.calle,
        ciudad: direccion.value.ciudad,
        cp: direccion.value.cp,
        provincia: direccion.value.provincia,
        pais: direccion.value.pais,
        dni: direccion.value.dni
      },
      metodo_entrega: props.metodoEntrega,
      user_id: userId 

    })

    const clientSecret = response.data.clientSecret
    console.log('clientSecret:', clientSecret)
    router.push("/finalizarCompra/pago")
    localStorage.setItem('clientSecret', clientSecret)

  } catch (error) {
    console.error('Error al crear el PaymentIntent:', error)
  }
}
</script>