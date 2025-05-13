<template>
<div class="space-y-4 text-center mt-5">
  <div class="p-4 sm:p-5 bg-blue-500 rounded-2xl shadow-md text-white text-sm sm:text-base">
    Tu edad metabólica es de 
    <span class="font-semibold text-yellow-300">{{ edadMetabolica }}</span> años.
  </div>

  <div class="p-4 sm:p-5 bg-blue-500 rounded-2xl shadow-md text-white text-sm sm:text-base">
    Tu metabolismo basal es de 
    <span class="font-semibold text-yellow-300">{{ metabolismoBasal }}</span> kcal.
  </div>

  <div class="p-4 sm:p-5 bg-blue-500 rounded-2xl shadow-md text-white text-sm sm:text-base">
    Tu factor proteico es de 
    <span class="font-semibold text-yellow-300">{{ factorProteico }}</span> gramos.
  </div>
</div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
import { Estudio } from '../types/Estudio';
  
  interface Props {
    estudios: Estudio[]
  }
  
  const props = defineProps<Props>()
  
  // Tomamos el estudio más reciente
  const ultimoEstudio = computed(() => {
    return props.estudios.length ? props.estudios[0] : null
  })
  
  // Calculamos metabolismo basal (BMR)
  const metabolismoBasal = computed(() => {
    if (!ultimoEstudio.value) return 0
  
    const { peso, altura, edad, sexo } = ultimoEstudio.value
  
    if (sexo === 'hombre') {
      return Math.round((10 * peso) + (6.25 * altura) - (5 * edad) + 5)
    } else if (sexo === 'mujer') {
      return Math.round((10 * peso) + (6.25 * altura) - (5 * edad) - 161)
    } else {
      return 0
    }
  })
  
  // Edad metabólica (simplificado: igual que edad real por ahora)
  const edadMetabolica = computed(() => {
    return ultimoEstudio.value?.edad ?? '-'
  })
  
  // Factor proteico (1g por kg de peso)
  const factorProteico = computed(() => {
    return ultimoEstudio.value ? Math.round(ultimoEstudio.value.peso) : '-'
  })
  </script>
  