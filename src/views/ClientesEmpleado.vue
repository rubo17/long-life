<template>
  <div class="max-w-6xl mx-auto px-4 py-10 space-y-8">
  <div class="flex flex-col items-center justify-between gap-4 mb-8">
    <div class="flex md:flex-row justify-center items-center gap-4">
      <RouterLink class="hover:underline text-blue-500" to="/perfil">
          <FlechaAtras class="h-8 w-8"/>
      </RouterLink>
      <h1 class="text-xl md:text-3xl font-bold text-green-600 text-center"> Mis Clientes Asignados</h1>
    </div>
    <RouterLink
      to="/misCitas"
      class="text-white bg-blue-500 hover:bg-blue-600 transition px-6 py-2 rounded-lg text-sm font-medium shadow-md"
    >
      Ver mis citas
    </RouterLink>
  </div>
    <div v-if="loading" class="flex  justify-center items-center h-full w-full">
      <Loading />
    </div>
    <div v-else>
      <div v-if="clientes.length" class="grid md:grid-cols-2 gap-6">
        <div
          v-for="cliente in clientes"
          :key="cliente.id_usuario"
          class="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition space-y-4 border border-gray-200"
        >
          <!-- Info básica del cliente -->
          <div>
            <p class="text-sm text-gray-800 font-bold">
              Tu cliente: {{ cliente.gmail }}
            </p>
          </div>

          <!-- Botón para ver ficha del cliente -->
          <p
            class="text-green-500 cursor-pointer underline"
            @click="openModal(cliente)"
          >
            Ver ficha del Cliente
          </p>

          <!-- Modal con detalles del cliente -->
          <Modal :open="showModal" @close="showModal = false">
            <div class="flex flex-col gap-2">
              <div>📅 Edad: {{ selectedCliente.edad || 'No definida' }}</div>
              <div>⚖️ Peso: {{ selectedCliente.peso || '-' }} kg</div>
              <div>📏 Altura: {{ selectedCliente.altura || '-' }} cm</div>
              <div>💪 Experiencia: {{ selectedCliente.experiencia || 'No definida' }}</div>
              <div>🥗 Preferencias: {{ selectedCliente.preferencias || 'No indicadas' }}</div>
              <div>📝 Observaciones: {{ selectedCliente.observaciones || 'Ninguna' }}</div>
            </div>
          </Modal>

          <!-- Subida de plan personalizado -->
          <div>
            <label class="block font-semibold mb-1 text-gray-700">Subir plan diseñado (PDF):</label>
            <input
              type="file"
              accept=".pdf"
              @change="handleUpload($event, cliente.id_usuario, cliente.id_plan)"
              class="w-full text-sm cursor-pointer"
            />
          </div>
        </div>
      </div>
          <div v-else class="text-center text-gray-500">
            No tienes clientes asignados aún.
        </div>
    </div>


    <!-- Mensaje si no hay clientes -->

  </div>
</template>


<script setup lang="ts">
import { notify } from '@kyvg/vue3-notification'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import api from '../api/axios'
import Modal from '../components/admin/ui/Modal.vue'
import FlechaAtras from '../components/icons/FlechaAtras.vue'
import Loading from '../components/loading.vue'

const clientes = ref<any[]>([])
const idEmpleado = ref<number | null>(null)
const loading = ref (true)
const storedUser = localStorage.getItem('user')
const user = storedUser ? JSON.parse(storedUser) : null
const idUsuario = user?.id_usuario ?? null

const showModal = ref(false)
const selectedCliente = ref<any>(null)

const openModal = (cliente: any) => {
  selectedCliente.value = cliente
  showModal.value = true
}
const citas = ref<any[]>([])

onMounted(async () => {
  if (!idUsuario) return

  try {
    const resEmpleado = await api.get(`getEmpleadoByUserId/${idUsuario}`)
    idEmpleado.value = resEmpleado.data.id_empleado

    const resClientes = await api.get(`clientes/empleado/${idEmpleado.value}`)
    clientes.value = resClientes.data
    loading.value=false
  } catch (error) {
    console.error('Error al cargar datos:', error)
  }
})

const handleUpload = async (event: Event, idUsuario: number, idPlan: number) => {
  const fileInput = event.target as HTMLInputElement
  const file = fileInput?.files?.[0]
  if (!file || !idEmpleado.value) return

  const formData = new FormData()
  formData.append('archivo', file)
  formData.append('id_usuario', idUsuario.toString())
  formData.append('id_plan', idPlan.toString())
  formData.append('id_empleado', idEmpleado.value.toString())

  try {
    await api.post('/planes-designed', formData)
      notify({type: 'success',text: 'Plan añadido correctamente al usuario'});            
  } catch (err) {
    console.error('❌ Error al subir el plan', err)
      notify({type: 'error',text: 'Plan no añadido'});            
  }
}



</script>


  