<template>
        <div class="space-y-6">
            
            <h1 class="text-lg font-semibold">Detalles de envío</h1>
    
            <div class="flex gap-4 justify-center text-center">
              <div class="flex-1 border rounded-lg flex flex-col items-center justify-center p-4 cursor-pointer hover:border-green-500 transition">
                <svg class="w-8 h-8 mb-1" viewBox="0 0 24 24"><path fill="currentColor" d="M20.001 11.452 20 18.99h2v2H2v-2h2v-7.534A4 4 0 0 1 2.005 8.19L2 7.99v-3a2 2 0 0 1 1.85-1.994L4 2.989h16a2 2 0 0 1 1.995 1.85v3a4 4 0 0 1-1.999 3.463Z" /></svg>
                <p class="text-sm">Recogida en tienda</p>
              </div>
              <div class="flex-1 border rounded-lg flex flex-col items-center justify-center p-4 cursor-pointer hover:border-green-500 transition">
                <svg class="w-8 h-8 mb-1" viewBox="0 0 24 24"><path fill="currentColor" d="M7 8v2H2V8zm10.434-1H14v3h5.234zM20 12h-6v4h.17a3.001 3.001 0 0 1 5.66 0H20zm-3 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" /></svg>
                <p class="text-sm">Entrega a domicilio</p>
              </div>
            </div>
    
            <form @submit.prevent="enviarFormulario" class="space-y-4 bg-white rounded-2xl shadow-md">
              <div>
                <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre completo</label>
                <input type="text" id="nombre" v-model="direccion.nombre" class="w-full border rounded-md p-2 focus:ring focus:ring-green-200" required />
              </div>
    
              <div>
                <label for="telefono" class="block text-sm font-medium text-gray-700">Teléfono</label>
                <input type="tel" id="telefono" v-model="direccion.telefono" class="w-full border rounded-md p-2 focus:ring focus:ring-green-200" required />
              </div>
    
              <div>
                <label for="calle" class="block text-sm font-medium text-gray-700">Dirección</label>
                <input type="text" id="calle" v-model="direccion.calle" class="w-full border rounded-md p-2 focus:ring focus:ring-green-200" required />
              </div>
    
              <div class="flex flex-col sm:flex-row gap-4">
                <div class="flex-1">
                  <label for="ciudad" class="block text-sm font-medium text-gray-700">Ciudad</label>
                  <input type="text" id="ciudad" v-model="direccion.ciudad" class="w-full border rounded-md p-2 focus:ring focus:ring-green-200" required />
                </div>
                <div class="flex-1">
                  <label for="cp" class="block text-sm font-medium text-gray-700">Código postal</label>
                  <input type="text" id="cp" v-model="direccion.cp" class="w-full border rounded-md p-2 focus:ring focus:ring-green-200" required />
                </div>
              </div>
    
              <div>
                <label for="provincia" class="block text-sm font-medium text-gray-700">Provincia</label>
                <input type="text" id="provincia" v-model="direccion.provincia" class="w-full border rounded-md p-2 focus:ring focus:ring-green-200" required />
              </div>
    
              <div>
                <label for="pais" class="block text-sm font-medium text-gray-700">País</label>
                <input type="text" id="pais" v-model="direccion.pais" class="w-full border rounded-md p-2 focus:ring focus:ring-green-200" required />
              </div>
              <div>
                <label for="dni" class="block text-sm font-medium text-gray-700">Dni</label>
                <input type="text" id="dni" v-model="direccion.pais" class="w-full border rounded-md p-2 focus:ring focus:ring-green-200" required />
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
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

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

const enviarFormulario = async () => {
  console.log('Dirección enviada:', direccion.value)

  try {
    const response = await axios.post('http://localhost/longLifeBack/public/finalizarCompra/payment-intent', {
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
      }
    })

    const clientSecret = response.data.clientSecret
    console.log('clientSecret:', clientSecret)
    router.push("/finalizarCompra/pago")
    // Aquí puedes redirigir a una vista con Stripe Elements o cargarlo directamente
    // Por ejemplo: guardar en localStorage y navegar a la página de pago
    localStorage.setItem('clientSecret', clientSecret)

  } catch (error) {
    console.error('Error al crear el PaymentIntent:', error)
  }
}
</script>