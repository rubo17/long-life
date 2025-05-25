<template>
  <div class="max-w-6xl mx-auto px-4 py-10 space-y-8">
    <div class="flex md:flex-row justify-center items-center gap-4">
      <RouterLink class="hover:underline text-blue-500" to="/clientesEmpleado">
          <FlechaAtras class="h-8 w-8"/>
      </RouterLink>
      <h1 class="text-xl md:3xl font-bold text-green-600 text-center">📅 Mis Citas Agendadas</h1>
    </div>

    <div v-if="loading" class="flex justify-center items-center w-full">
      <Loading />
    </div>

    <div v-else>
      <div v-if="citas.length" class="flex flex-col space-y-6">
        <div
          v-for="cita in citas"
          :key="cita.id"
          class="relative w-full group border-gray-400 rounded-lg border p-6 shadow-md hover:shadow-lg transition space-y-5"
        >
        <button
          class="absolute top-3 right-3 
                opacity-100 md:opacity-0 
                md:group-hover:opacity-100 
                transition bg-gray-100 hover:bg-gray-200 
                text-gray-600 px-2 py-1 text-xs rounded shadow cursor-pointer"
          @click="openConfirm(cita.id, '¿Estás seguro que deseas archivar esta cita?(Archívala en caso de que ya no sea necesaria)')"
        >
          🗃 Archivar
        </button>

          <div class="text-sm space-y-2">
            <h2 class="text-xl text-blue-500 font-semibold">{{ cita.nombre_cliente }}</h2>
            <p><span class="font-bold">Gmail: </span>{{ cita.email_cliente }}</p>
            <p><strong>Plan:</strong> {{ cita.nombre_plan }}</p>
            <p><strong>Fecha:</strong> {{ cita.fecha }}</p>
            <p><strong>Mensaje:</strong> {{ cita.mensaje || 'Sin mensaje' }}</p>
          </div>

          <div>
            <span
              class="inline-block px-3 py-1 rounded-full text-xs font-semibold"
              :class="{
                'bg-yellow-100 text-yellow-700': cita.estado === 'pendiente',
                'bg-green-100 text-green-700': cita.estado === 'aceptada',
                'bg-red-100 text-red-700': cita.estado === 'rechazada'
              }"
            >
              Estado: {{ cita.estado }}
            </span>
          </div>

          <div>
            <label class="text-sm font-semibold text-gray-600">Cambiar estado:</label>
            <select
              v-model="cita.estado"
              @change="actualizarEstadoCita(cita)"
              class="mt-1 p-2 border rounded text-sm w-full"
            >
              <option value="pendiente">Pendiente</option>
              <option value="aceptada">Aceptar</option>
              <option value="rechazada">Rechazar</option>
            </select>
          </div>
        </div>
      </div>

      <div v-else class="text-center text-gray-500 text-lg">
        No tienes citas registradas por ahora.
      </div>
    </div>
  </div>
    <ModalConfirmDelete
      v-if="showConfirm"
      :message="deleteMessage"
      :confirmMessage="'Archivar Cita'"
      @confirm="handleArchivar"
      @cancel="showConfirm = false"
    />
</template>

<script setup lang="ts">
import { notify } from '@kyvg/vue3-notification'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import api from '../api/axios'
import FlechaAtras from '../components/icons/FlechaAtras.vue'
import Loading from '../components/loading.vue'
import ModalConfirmDelete from '../components/ModalConfirmDelete.vue'

const citas = ref<any[]>([])
const storedUser = localStorage.getItem('user')
const user = storedUser ? JSON.parse(storedUser) : null
const idUsuario = user?.id_usuario ?? null
const loading = ref(true)
const idEmpleado = ref<number | null>(null)

const showConfirm = ref(false)
const idToDelete = ref<number | null>(null)
const deleteMessage = ref('')

onMounted(() => {
  if (!idUsuario) return
  fecthCitas()
})

const fecthCitas = async () => {
  try {
    const resEmpleado = await api.get(`/getEmpleadoByUserId/${idUsuario}`)
    idEmpleado.value = resEmpleado.data.id_empleado

    const resCitas = await api.get(`/citas/todas/${idEmpleado.value}`)
    citas.value = resCitas.data.filter(cita => cita.estado !== 'archivada')
    loading.value = false
  } catch (err) {
    console.error('Error al cargar citas:', err)
  }
}

const actualizarEstadoCita = async (cita) => {
  try {
    await api.post('/citas/cambiarEstado', {
      id: cita.id,
      estado: cita.estado
    })
    notify({ type: 'success', text: 'Estado actualizado' })
  } catch (err) {
    console.error('❌ Error al actualizar estado de cita', err)
    notify({ type: 'error', text: 'Cita no actualizada' })
  }
}

const openConfirm = (id: number, message: string) => {
  idToDelete.value = id
  deleteMessage.value = message
  showConfirm.value = true
}

const handleArchivar = async () => {
  if (idToDelete.value === null) return

  try {
    await api.post('/citas/cambiarEstado', {
      id: idToDelete.value,
      estado: 'archivada'
    })
    notify({ type: 'success', text: 'Cita archivada correctamente' })
    await fecthCitas()
  } catch (err) {
    console.error('Error al archivar cita:', err)
    notify({ type: 'error', text: 'No se pudo archivar la cita' })
  } finally {
    showConfirm.value = false
    idToDelete.value = null
  }
}
</script>

