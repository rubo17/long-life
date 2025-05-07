import { ref } from 'vue'
import api from '../../api/axios'

export function usePlanes() {
  const tienePlanActivo = ref(false)

  const verificarPlanActivo = async (idUsuario: number, idPlan?: number | null) => {
    try {
      const res = await api.get(`/usuarios/${idUsuario}/planes-activos`)
      const planes = res.data || []

      if (idPlan != null) {
        tienePlanActivo.value = planes.some(
          (plan: any) => Number(plan.id_plan) === Number(idPlan) && plan.status === 'activado'
        )
      } else {
        tienePlanActivo.value = planes.length > 0
      }
    } catch (err) {
      console.error('Error verificando planes activos:', err)
      tienePlanActivo.value = false
    }
  }

  return {
    tienePlanActivo,
    verificarPlanActivo
  }
}
