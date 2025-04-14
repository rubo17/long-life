// src/composables/useAuth.ts
import axios from 'axios';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { User } from '../../../types/User';
import { useRole } from '../../UseRole';

const token = ref<string | null>(localStorage.getItem('token'));
const user = ref<User | null>(
  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null
);
const loading = ref(false);
const error = ref<string | null>(null);

export function useAuthLogin() {
  const login = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;

    try {
        const res = await axios.post(
            'http://localhost/longLifeBack/public/auth/login',
            { email, password },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
    );

      token.value = res.data.token;
      user.value = res.data.user;
      const safeUser = {
        id_usuario: user.value!.id_usuario,
        nombre: user.value!.nombre,
        email: user.value!.email,
        rol: user.value!.rol,
        id_suscripcion: user.value!.id_suscripcion
      };

      localStorage.setItem('token', token.value!);
      localStorage.setItem('user', JSON.stringify(safeUser));

    } catch (err: any) {
      error.value = err.response?.data?.messages?.error || 'Error al iniciar sesión';
    } finally {
      loading.value = false;
    }
  };
  const router = useRouter()

  const logout = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem("productsInCart")
    router.push('/login')
    const {  updateRole } = useRole();
    updateRole(); 
  };

  const isLoggedIn = computed(() => !!token.value);

  const loadUser = () => {
    const stored = localStorage.getItem('user');
    if (stored) {
      user.value = JSON.parse(stored);
    }
  };

  return {
    user,
    token,
    loading,
    error,
    login,
    logout,
    isLoggedIn,
    loadUser
  };
}
