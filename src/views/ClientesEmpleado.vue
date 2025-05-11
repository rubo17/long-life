<template>
  <div class="max-w-6xl mx-auto px-4 py-10 space-y-8">
    <h1 class="text-3xl font-bold text-green-600 text-center">Mis Clientes Asignados</h1>

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

        <!-- Listado de citas del cliente -->
        <div v-if="citas.length">
          <div
            v-for="cita in citas.filter(c => c.id_usuario === cliente.id_usuario && c.id_plan === cliente.id_plan)"
            :key="cita.id"
            class="text-sm bg-gray-100 rounded-lg space-y-2"
          >
            <p> <strong>Fecha:</strong> {{ cita.fecha }}</p>
            <p><strong>Mensaje:</strong> {{ cita.mensaje || 'Sin mensaje' }}</p>

            <!-- Select para cambiar estado -->
            <div class="flex gap-2 items-center">
              <label class="text-sm font-semibold text-gray-600">Estado:</label>
              <select
                v-model="cita.estado"
                @change="actualizarEstadoCita(cita)"
                class="mt-1 p-2 border rounded text-sm"
              >
                <option value="pendiente">Pendiente</option>
                <option value="aceptada">Aceptar</option>
                <option value="rechazada">Rechazar</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mensaje si no hay clientes -->
    <div v-else class="text-center text-gray-500">
      No tienes clientes asignados aún.
    </div>
  </div>
</template>


<script setup lang="ts">
import { notify } from '@kyvg/vue3-notification'
import { onMounted, ref } from 'vue'
import api from '../api/axios'
import Modal from '../components/admin/ui/Modal.vue'
const clientes = ref<any[]>([])
const idEmpleado = ref<number | null>(null)

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

    // 🆕 cargar citas
    const resCitas = await api.get(`citas/empleado/${idEmpleado.value}`)
    citas.value = resCitas.data
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

const actualizarEstadoCita = async (cita) => {
  try {
    await api.post('/citas/cambiarEstado', {
      id: cita.id,
      estado: cita.estado
    })
      notify({type: 'success',text: 'Estado Actualizado'});            
  } catch (err) {
    console.error('❌ Error al actualizar estado de cita', err)
      notify({type: 'error',text: 'Cita no actualizada'});            
  }
}

</script>


  