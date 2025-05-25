<template>
  <div class="space-y-4 text-center mt-5">
    <!-- Edad Metabólica -->
    <div
      class="relative p-4 sm:p-5 bg-blue-500 rounded-2xl shadow-md text-white text-sm sm:text-base"
    >
      Tu edad metabólica es de
      <span class="font-semibold text-yellow-300">{{ edadMetabolica }}</span> años.
      <button
        @click="openInfoModal('Edad Metabólica', edadMetabolicaInfo)"
        class="absolute top-0 right-0 text-white hover:text-yellow-200 text-sm cursor-pointer"
        title="Ver información"
      >
        <Info class="w-6 h-6 z-100 "/>
      </button>
    </div>

    <!-- Metabolismo Basal -->
    <div
      class="relative p-4 sm:p-5 bg-blue-500 rounded-2xl shadow-md text-white text-sm sm:text-base"
    >
      Tu metabolismo basal es de
      <span class="font-semibold text-yellow-300">{{ metabolismoBasal }}</span> kcal.
      <button
        @click="openInfoModal('Metabolismo Basal', metabolismoBasalInfo)"
        class="absolute top-0 right-0 text-white hover:text-yellow-200 text-sm cursor-pointer"
        title="Ver información"
      >
        <Info class="w-6 h-6 z-100 "/>
      </button>
    </div>

    <!-- Factor Proteico -->
    <div
      class="relative p-4 sm:p-5 bg-blue-500 rounded-2xl shadow-md text-white text-sm sm:text-base cursor-pointer"
    >
      Tu factor proteico es de
      <span class="font-semibold text-yellow-300">{{ factorProteico }}</span> gramos.
      <button
        @click="openInfoModal('Tu Factor Proteico', factorProteicoInfo)"
        class="absolute top-0 right-0 text-white hover:text-yellow-200 text-sm"
        title="Ver información"
      >
        <Info class="w-6 h-6 z-100 "/>
      </button>
    </div>

    <!-- Modal informativo -->
    <ModalInfo
      v-if="showModal"
      :title="modalTitle"
      :message="modalMessage"
      @close="showModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Estudio } from '../types/Estudio';
import ModalInfo from './ModalInfo.vue';
import Info from './icons/Info.vue';

interface Props {
  estudios: Estudio[]
}
const props = defineProps<Props>()

const showModal = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')

const openInfoModal = (title: string, message: string) => {
  modalTitle.value = title
  modalMessage.value = message
  showModal.value = true
}

// Mensajes informativos
const edadMetabolicaInfo = `La edad metabólica se estima a partir de tu tasa metabólica basal (TMB).
Comparándola con el promedio de tu grupo de edad, sexo y condición física.
Una edad metabólica más baja que tu edad real suele indicar buena salud.`

const metabolismoBasalInfo = `El metabolismo basal (TMB) representa la cantidad de energía (calorías) que tu cuerpo necesita en reposo absoluto para funcionar correctamente.
Se calcula según tu sexo, peso, altura y edad. No incluye actividad física.`

const factorProteicoInfo = `El factor proteico representa la cantidad diaria recomendada de proteína en gramos.
Depende de tu peso corporal y nivel de actividad:

- Sedentario: 0.8 g/kg
- Activo: 1.2–1.6 g/kg
- Muy activo o entrenamiento: 1.6–2.2 g/kg

Consulta a un nutricionista para determinar el ideal para ti.`

// Último estudio disponible
const ultimoEstudio = computed(() => {
  return props.estudios.length ? props.estudios[0] : null
})

// Edad metabólica (simplificado: igual a edad real)
const edadMetabolica = computed(() => {
  return ultimoEstudio.value?.edad ?? '-'
})

// Metabolismo basal (TMB): fórmula de Harris-Benedict
const metabolismoBasal = computed(() => {
  if (!ultimoEstudio.value) return 0
  const { peso, altura, edad, sexo } = ultimoEstudio.value
  if (sexo === 'hombre') {
    return Math.round(10 * peso + 6.25 * altura - 5 * edad + 5)
  } else if (sexo === 'mujer') {
    return Math.round(10 * peso + 6.25 * altura - 5 * edad - 161)
  } else {
    return 0
  }
})

// Factor proteico: 1g/kg de peso corporal (simplificado)
const factorProteico = computed(() => {
  return ultimoEstudio.value ? Math.round(ultimoEstudio.value.peso) : '-'
})
</script>
