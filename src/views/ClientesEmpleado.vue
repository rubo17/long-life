<template>
    <div class="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <h1 class="text-3xl font-bold text-green-600 text-center">Mis Clientes Asignados</h1>
  
      <div v-if="clientes.length" class="grid md:grid-cols-2 gap-6">
        <div
          v-for="cliente in clientes"
          :key="cliente.id_usuario"
          class="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition space-y-4 border border-gray-200"
        >
          <!-- Encabezado del cliente -->
          <div>
            <h2 class="text-2xl font-bold text-gray-800">{{ cliente.nombre }}</h2>
            <p class="text-sm text-gray-500">📧 {{ cliente.gmail }}</p>
            <p class="text-sm text-gray-500">🎯 Objetivo: {{ cliente.objetivo || 'Sin definir' }}</p>
          </div>

          <!-- Información corporal -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-600">
            <div>📅 Edad: {{ cliente.edad || 'No definida' }}</div>
            <div>⚖️ Peso: {{ cliente.peso || '-' }} kg</div>
            <div>📏 Altura: {{ cliente.altura || '-' }} cm</div>
            <div>💪 Experiencia: {{ cliente.experiencia || 'No definida' }}</div>
            <div>🥗 Preferencias: {{ cliente.preferencias || 'No indicadas' }}</div>
            <div>📝 Observaciones: {{ cliente.observaciones || 'Ninguna' }}</div>
          </div>

          <!-- Subir plan diseñado -->
          <div>
            <label class="block font-semibold mb-1 text-gray-700">Subir plan diseñado (PDF):</label>
            <input type="file" accept=".pdf" @change="handleUpload($event, cliente.id_usuario, cliente.id_plan)" class="w-full text-sm cursor-pointer" />
          </div>

          <!-- Peticiones de videollamada -->
          <div>
            <label class="block font-semibold mb-1 text-gray-700">Estado de la videollamada:</label>
            <select v-model="cliente.estado_cita" @change="cambiarEstadoCita(cliente.id_usuario, cliente.estado_cita)" class="p-2 border rounded w-full">
              <option value="pendiente">Pendiente</option>
              <option value="aceptada">Aceptar</option>
              <option value="rechazada">Rechazar</option>
            </select>
          </div>
        </div>
      </div>
  
      <div v-else class="text-center text-gray-500">
        No tienes clientes asignados aún.
      </div>
    </div>
  </template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import api from '../api/axios'

const clientes = ref<any[]>([])
const idEmpleado = ref<number | null>(null)

const storedUser = localStorage.getItem('user')
const user = storedUser ? JSON.parse(storedUser) : null
const idUsuario = user?.id_usuario ?? null

onMounted(async () => {
  if (!idUsuario) return

  try {
    // 🔍 Paso 1: Obtener id_empleado desde el id_usuario
    const resEmpleado = await api.get(`getEmpleadoByUserId/${idUsuario}`)
    idEmpleado.value = resEmpleado.data.id_empleado

    // ✅ Paso 2: Obtener clientes asignados a este empleado
    const resClientes = await api.get(`clientes/empleado/${idEmpleado.value}`)
    clientes.value = resClientes.data
  } catch (error) {
    console.error('Error al cargar datos del empleado:', error)
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
    alert('✅ Plan enviado correctamente')
  } catch (err) {
    console.error('❌ Error al subir el plan', err)
    alert('Error al subir el plan')
  }
}

const cambiarEstadoCita = async (idUsuario: number, nuevoEstado: string) => {
  try {
    await api.post('/citas/estado', {
      id_usuario: idUsuario,
      estado: nuevoEstado
    })
    alert('Estado de cita actualizado')
  } catch (err) {
    console.error('Error al actualizar cita:', err)
  }
}
</script>


  