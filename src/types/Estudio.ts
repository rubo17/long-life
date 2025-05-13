export interface Estudio {
    id: number
    user_id: number
    peso: number
    altura: number
    edad: number
    sexo: 'hombre' | 'mujer'
    cintura?: number | null
    cadera?: number | null
    actividad?: 'sedentario' | 'ligero' | 'moderado' | 'intenso' | null
    imc?: number | null
    whr?: number | null
    created_at: string
    updated_at: string
  }
  