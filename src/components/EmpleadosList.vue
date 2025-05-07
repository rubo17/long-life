<template>
    <div class="mt-12 px-4 space-y-10 max-w-6xl mx-auto">
      <h2 class="text-3xl font-bold text-center text-green-600">Conoce a nuestros {{ titulo }}</h2>
  
      <div class="flex flex-col gap-8">
        <div
          v-for="empleado in empleados"
          :key="empleado.id"
          class="bg-white rounded-xl shadow-md p-5 flex flex-col md:flex-row items-center md:items-start gap-6"
        >
          <!-- Imagen -->
          <img
            :src="empleado.imagen"
            alt="Foto del {{ tipoEmpleado }}"
            class="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-green-500"
          />
  
          <!-- Info -->
          <div class="text-center md:text-left flex-1">
            <h3 class="text-xl font-semibold text-gray-800">{{ empleado.nombre }}</h3>
            <p class="text-gray-600 mt-3">{{ empleado.descripcion }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref, watch } from 'vue'
import api from '../api/axios'
  
  const props = defineProps({
    tipoEmpleado: {
      type: String,
      required: true
    },
    titulo: {
      type: String,
      default: 'especialistas'
    }
  })
  
  const empleados = ref([])
  
  const cargarEmpleados = async () => {
    try {
      const res = await api.get('/empleados')
      console.log(props.tipoEmpleado)
      empleados.value = res.data.data.filter(emp => emp.tipo === props.tipoEmpleado)
    } catch (error) {
      console.error('Error al obtener empleados:', error)
    }
  }
  
  onMounted(cargarEmpleados)
  watch(() => props.tipoEmpleado, cargarEmpleados)
  </script>
  