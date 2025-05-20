<template>
  <div>
    <div class="bg-gray-100 border-t-4 border-green-500 p-10 flex gap-2 lg:gap-5">
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="30" width="30"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z">
        </path>
        <path d="M12 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2"></path>
      </svg>
      <p class="text-[19px]">
        ¿Tienes un cupón?
        <span class="text-blue-500 font-bold cursor-pointer" @click="toggleForm">Haz clic aquí para introducir tu código</span>
      </p>
    </div>

    <div v-if="mostrarFormulario" class="transition-all duration-500 ease-in-out max-h-96 scale-100">
      <form @submit.prevent="verificarCupon" class="space-y-5 bg-white p-5">
        <p class="text-lg sm:text-xl">Si tienes un código de cupón, por favor, aplícalo abajo.</p>
        <div class="flex flex-col sm:flex-row gap-3">
          <input
            id="coupon"
            v-model="codigo"
            class="border p-2 rounded-md sm:w-100"
            placeholder="Código de cupón"
            type="text"
          />
          <button
            type="submit"
            class="cursor-pointer bg-green-500 text-white flex justify-center items-center gap-1.5 p-2 px-6 rounded-lg font-bold border border-green-500 hover:bg-white hover:text-green-500 transition"
          >
            Aplicar cupón
          </button>
        </div>
        <p :class="mensajeColor" id="message">{{ mensaje }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '../api/axios'
const codigo = ref('')
const mensaje = ref('')
const mensajeColor = ref('')
const mostrarFormulario = ref(false)

const toggleForm = () => {
  mostrarFormulario.value = !mostrarFormulario.value
}

const user = JSON.parse(localStorage.getItem('user') || '{}')
const user_id = user.id_usuario

const emit = defineEmits(['cuponValido']) 

const verificarCupon = async () => {
  mensaje.value = ''
  try {
    const response = await api.post('/cupons/verificar', {
      codigo: codigo.value,
      user_id
    })

    const cupon = response.data.cupon

    localStorage.setItem("cuponInfo", JSON.stringify(cupon))
    mensaje.value = `Cupón válido: ${cupon.descripcion}`
    mensajeColor.value = 'text-green-600'

    emit('cuponValido', cupon)

  } catch (error) {
    mensaje.value = error.response?.data?.message || 'Cupón inválido'
    mensajeColor.value = 'text-red-500'

    // Limpieza segura
    localStorage.removeItem('cuponInfo')
    emit('cuponValido', null)
  }
}

</script>
