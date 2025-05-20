

<template>
  <div class="container mx-auto px-4 py-12 mt-24 space-y-10">
    <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Mi Perfil</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Mis Actividades -->
      <RouterLink to ="/clientesEmpleado" v-if="esEmpleado" class="p-6 bg-white shadow-lg rounded-xl space-y-4 hover:shadow-lg hover:ring-1 hover:ring-green-300 transition block">
        <h2 class="text-xl font-semibold text-gray-700 border-b-2 border-green-500 pb-2">🧘‍♀️ Mis clientes</h2>
        <p class="text-gray-500 text-sm">Gestiona tus clientes.</p>
      </RouterLink>

      <!-- Mis Pedidos -->
      <RouterLink
        to="/pedidos"
        class="p-6 bg-white shadow-lg rounded-xl space-y-4 hover:shadow-lg hover:ring-1 hover:ring-green-300 transition block"
      >
          <div>
            <h2 class="text-xl font-semibold text-gray-700 border-b-2 border-green-500 pb-2">📦 Mis Pedidos</h2>
            <p class="text-gray-500 text-sm mt-2">Consulta el estado de tus pedidos y revisa los productos comprados.</p>
          </div>

      </RouterLink>

      <!-- Estudio Corporal -->
       
<!-- Estudio Corporal (solo si es Premium) -->
  <div v-if="esPremium" class="p-6 bg-white shadow-lg rounded-lg space-y-4">
    <h2 class="text-xl font-semibold text-gray-700 border-b-2 border-green-500 pb-2">📊 Estudio Corporal</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition cursor-pointer">
        <div
          @click="showMedicionModal = true"
          class="cursor-pointer"
        > 
        <p class="font-medium text-gray-700">Nueva Medición</p>
          <p class="text-sm text-gray-500">Registra tus medidas actuales</p>
        </div>
        <MeditionIcon class="w-6 h-6 text-green-500" />
      </div>
      <div class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition cursor-pointer">
        <RouterLink 
          to="/misMediciones"
        >
          <p class="font-medium text-gray-700">Mis Resultados</p>
          <p class="text-sm text-gray-500">Consulta tu historial corporal</p>
        </RouterLink>
        <Statistics class="w-6 h-6 text-blue-600" />
      </div>
    </div>
  </div>

<!-- Opcional: Mostrar mensaje para no premium -->
  <div v-else class="p-6 bg-white shadow-lg rounded-xl space-y-4">
    <h2 class="text-xl font-semibold text-gray-500 border-b-2 border-gray-400 pb-2">🔒 Estudio Corporal Premium</h2>
    <p class="text-gray-400 text-sm">Este módulo es exclusivo para usuarios Premium. Suscríbete para registrar y consultar tus mediciones corporales.</p>
  </div>

      <RouterLink to ="/contenidosPremium" v-if="esPremium" class="p-6 bg-white shadow-lg rounded-xl space-y-4 hover:shadow-lg hover:ring-1 hover:ring-green-300 transition block">
        <h2 class="text-xl font-semibold text-gray-700 border-b-2 border-green-500 pb-2">📚 Tu Contenido</h2>
        <p class="text-gray-500 text-sm">Accede a tus rutinas personalizadas, planes nutricionales y recursos exclusivos.</p>
      </RouterLink>

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
            <p class="text-gray-500 text-sm mt-2">Modifica tu información personal, contraseña y preferencias fácilmente.</p>
          </div>
      </div>
      <router-link
        to="/infoSuscripcion"
        class="p-6 bg-white shadow-lg rounded-xl space-y-4 hover:ring-1 hover:ring-green-300 transition cursor-pointer"
      >
          <div>
            <h2 class="text-xl font-semibold text-gray-700 border-b-2 border-green-500 pb-2"> ⭐ Tu suscripcion</h2>
            <p class="text-gray-500 text-sm mt-2">Activa hasta ...</p>
          </div>
      </router-link>

      <router-link
        to="/mis-planes"
        class="block p-6 bg-white shadow-lg rounded-xl space-y-4 hover:ring-1 hover:ring-green-300 transition cursor-pointer"
      >
        <div>
          <h2 class="text-xl font-semibold text-gray-700 border-b-2 border-green-500 pb-2">📋 Mis Planes Activos</h2>
          <p class="text-gray-500 text-sm mt-2">Consulta toda la información sobre tus planes activos</p>
        </div>
      </router-link>
            <RouterLink
        to="/misCupones"
        class="p-6 bg-white shadow-lg rounded-xl space-y-4 hover:shadow-lg hover:ring-1 hover:ring-green-300 transition block"
      >
          <div>
            <h2 class="text-xl font-semibold text-gray-700 border-b-2 border-green-500 pb-2">🤑 Tus Cupones</h2>
            <p class="text-gray-500 text-sm mt-2">Cupones De descuento exclusivos para ususarios Premium</p>
          </div>

      </RouterLink>

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
            class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition cursor-pointer"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </Modal>
    <Modal :open="showMedicionModal" @close="showMedicionModal = false">
  <h2 class="text-xl font-semibold text-gray-800 mb-4">Nueva Medición Corporal Completa</h2>

  <form @submit.prevent="guardarMedicion" class="space-y-4">

    <!-- Peso -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Peso (kg)</label>
      <input v-model="nuevaMedicion.peso" type="number" step="0.01" required
        class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200" />
    </div>

    <!-- Altura -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Altura (cm)</label>
      <input v-model="nuevaMedicion.altura" type="number" step="0.1" required
        class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200" />
    </div>

    <!-- Edad -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Edad</label>
      <input v-model="nuevaMedicion.edad" type="number" min="1" required
        class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200" />
    </div>

    <!-- Sexo -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Sexo</label>
      <select v-model="nuevaMedicion.sexo"
        class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200" required>
        <option value="" disabled>Seleccione</option>
        <option value="hombre">Hombre</option>
        <option value="mujer">Mujer</option>
      </select>
    </div>

    <!-- Circunferencia cintura -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Circunferencia de cintura (cm)</label>
      <input v-model="nuevaMedicion.cintura" type="number" step="0.1"
        class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200" />
    </div>

    <!-- Circunferencia cadera -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Circunferencia de cadera (cm)</label>
      <input v-model="nuevaMedicion.cadera" type="number" step="0.1"
        class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200" />
    </div>

    <!-- Nivel de actividad física -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Nivel de Actividad Física</label>
      <select v-model="nuevaMedicion.actividad"
        class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200">
        <option value="" disabled>Seleccione</option>
        <option value="sedentario">Sedentario</option>
        <option value="ligero">Ligero (1-3 días/semana)</option>
        <option value="moderado">Moderado (3-5 días/semana)</option>
        <option value="intenso">Intenso (6-7 días/semana)</option>
      </select>
    </div>

    <!-- Botón -->
    <div class="pt-2 text-center">
      <button type="submit"
        class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition">
        Guardar Medición
      </button>
    </div>

  </form>
</Modal>


  </div>
</template>
<script setup lang="ts">
import { notify } from '@kyvg/vue3-notification'
import { onMounted, ref } from 'vue'
import api from '../api/axios'
import Modal from '../components/admin/ui/Modal.vue'
import { useAuthLogin } from '../composables/api/login/UseUserLogin'
const showModal = ref(false)
const form = ref({
  nombre: '',
  email: '',
  password: ''
})
const esEmpleado = ref (false)
// Simulación de datos cargados del usuario
onMounted(async () => {
  const usuario = JSON.parse(localStorage.getItem('user') || '{}')
  const userId = usuario?.id_usuario

  try {
    const res = await api.get(`/usuarios/${userId}/es-empleado`)
    esEmpleado.value = res.data.es_empleado
  } catch (error) {
    console.error('Error al verificar tipo de usuario:', error)
  }

try {
  const check = await api.post('/verificarEstadoSuscripcion', {
    id_usuario: userId
  })

  if (check.data.status === 'actualizado') {
    // Solo si se actualizó la suscripción, refrescamos el token
    const refresh = await api.post('/auth/refreshToken', {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    if (refresh.data.token) {
      localStorage.setItem('token', refresh.data.token)
      refreshAuth()
    }
  }
} catch (err) {
  console.error('Error verificando la suscripción:', err)
}

  form.value.nombre = usuario.nombre || ''
  form.value.email = usuario.email || ''
})

const {esPremium,refreshAuth}= useAuthLogin();

const showMedicionModal = ref(false)
const nuevaMedicion = ref({
  peso: '',
  altura: '',
  edad: '',
  sexo: '',
  cintura: '',
  cadera: '',
  porcentajeGrasa: '',
  masaMuscular: '',
  actividad: ''
})
const guardarCambios = async () => {
  try {
    const token = localStorage.getItem('token')

    await api.put(`/editPerfil`, form.value, {
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
const guardarMedicion = async () => {
  try {
    const token = localStorage.getItem('token')
    await api.post('/nuevaMedicion', nuevaMedicion.value, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    notify({ type: 'success', title: 'Medición guardada correctamente' })
    showMedicionModal.value = false

    // Opcional: limpiar el formulario
    nuevaMedicion.value = {
      peso: '',
      altura: '',
      edad: '',
      sexo: '',
      cintura: '',
      cadera: '',
      porcentajeGrasa: '',
      masaMuscular: '',
      actividad: ''
    }
  } catch (err) {
    notify({ type: 'error', title: 'Error al guardar la medición' })
    console.error(err)
  }
}
</script>