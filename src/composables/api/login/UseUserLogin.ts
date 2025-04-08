// src/composables/useAuth.ts
import axios from 'axios';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { User } from '../../../types/User';

const token = ref<string | null>(localStorage.getItem('token'));
const user = ref<User | null>(
  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null
);
const loading = ref(false);
const error = ref<string | null>(null);

export function useAuth() {
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

      // Guardar token en localStorage
      localStorage.setItem('token', token.value!);
      localStorage.setItem('user', JSON.stringify(user.value));

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
    router.push('/login')
  };

  const isLoggedIn = computed(() => !!token.value);


  return {
    user,
    token,
    loading,
    error,
    login,
    logout,
    isLoggedIn
  };
}
