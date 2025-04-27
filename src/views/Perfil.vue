

<template>
  <div class="container mx-auto px-4 py-12 mt-24 space-y-10">
    <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Mi Perfil</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Mis Actividades -->
      <div class="p-6 bg-white shadow-lg rounded-xl space-y-4">
        <h2 class="text-xl font-semibold text-gray-700 border-b-2 border-green-500 pb-2">🧘‍♀️ Mis Actividades</h2>
        <p class="text-gray-500 text-sm">Consulta y gestiona tus actividades diarias y entrenamientos registrados.</p>
      </div>

      <!-- Mis Pedidos -->
      <RouterLink
        to="/pedidos"
        class="p-6 bg-white shadow-lg rounded-xl space-y-4 hover:shadow-xl hover:ring-1 hover:ring-green-300 transition block"
      >
          <div>
            <h2 class="text-xl font-semibold text-gray-700 border-b-2 border-green-500 pb-2">📦 Mis Pedidos</h2>
            <p class="text-gray-500 text-sm mt-2">Consulta el estado de tus pedidos y revisa los productos comprados.</p>
          </div>

      </RouterLink>

      <!-- Estudio Corporal -->
<!-- Estudio Corporal (solo si es Premium) -->
<div v-if="esPremium" class="p-6 bg-white shadow-lg rounded-xl space-y-4">
  <h2 class="text-xl font-semibold text-gray-700 border-b-2 border-green-500 pb-2">📊 Estudio Corporal</h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition cursor-pointer">
      <div>
        <p class="font-medium text-gray-700">Nueva Medición</p>
        <p class="text-sm text-gray-500">Registra tus medidas actuales</p>
      </div>
      <MeditionIcon class="w-6 h-6 text-green-500" />
    </div>
    <div class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition cursor-pointer">
      <div>
        <p class="font-medium text-gray-700">Mis Resultados</p>
        <p class="text-sm text-gray-500">Consulta tu historial corporal</p>
      </div>
      <Statistics class="w-6 h-6 text-blue-600" />
    </div>
  </div>
</div>

<!-- Opcional: Mostrar mensaje para no premium -->
<div v-else class="p-6 bg-white shadow-lg rounded-xl space-y-4">
  <h2 class="text-xl font-semibold text-gray-500 border-b-2 border-gray-400 pb-2">🔒 Estudio Corporal Premium</h2>
  <p class="text-gray-400 text-sm">Este módulo es exclusivo para usuarios Premium. Suscríbete para registrar y consultar tus mediciones corporales.</p>
</div>


      <div v-if="esPremium" class="p-6 bg-white shadow-lg rounded-xl space-y-4">
        <h2 class="text-xl font-semibold text-gray-700 border-b-2 border-green-500 pb-2">📚 Tu Contenido</h2>
        <p class="text-gray-500 text-sm">Accede a tus rutinas personalizadas, planes nutricionales y recursos exclusivos.</p>
      </div>

      <div v-else class="p-6 bg-white shadow-lg rounded-xl space-y-4 ">
        <h2 class="text-xl font-semibold text-gray-500 border-b-2 border-gray-400 pb-2">🔒 Contenido Premium</h2>
        <p class="text-gray-400 text-sm">Este contenido es exclusivo para usuarios Premium. ¡Suscríbete para acceder!</p>
      </div>

      <!-- Editar Perfil -->
      <div
        @click="showModal = true"
        class="p-6 bg-white shadow-lg rounded-xl space-y-4 hover:ring-1 hover:ring-green-300 transition cursor-pointer"
      >
          <div>
            <h2 class="text-xl font-semibold text-gray-700 border-b-2 border-green-500 pb-2">⚙️ Editar Perfil</h2>
            <p class="text-gray-500 text-sm">Modifica tu información personal, contraseña y preferencias fácilmente.</p>
          </div>
        </div>
    </div>
    <Modal :open="showModal" @close="showModal = false">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Editar Perfil</h2>

      <form @submit.prevent="guardarCambios" class="space-y-4">
        <!-- Nombre -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            v-model="form.nombre"
            type="text"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
            required
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
            required
          />
        </div>

        <!-- Contraseña -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="Deja vacío si no deseas cambiarla"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>

        <!-- Botón -->
        <div class="pt-2 text-center">
          <button
            type="submit"
            class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </Modal>
  </div>
</template>
<script setup lang="ts">
import { notify } from '@kyvg/vue3-notification'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import Modal from '../components/admin/ui/Modal.vue'
import { useAuthLogin } from '../composables/api/login/UseUserLogin'
const showModal = ref(false)
const form = ref({
  nombre: '',
  email: '',
  password: ''
})

// Simulación de datos cargados del usuario
onMounted(() => {
  const usuario = JSON.parse(localStorage.getItem('user') || '{}')
  form.value.nombre = usuario.nombre || ''
  form.value.email = usuario.email || ''
})
const user = JSON.parse(localStorage.getItem('user') || '{}')
const esPremium = user?.esPremium === true
const {}= useAuthLogin();
const guardarCambios = async () => {
  try {
    const token = localStorage.getItem('token')

    await axios.put(`http://localhost/longLifeBack/public/editPerfil`, form.value, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    notify({ type: 'success', title: 'perfil actualizado correctamente' })
    showModal.value = false
  } catch (err) {
      notify({ type: 'error', title: 'perfil actualizado correctamente' })
    console.error(err)
  }
}
</script>