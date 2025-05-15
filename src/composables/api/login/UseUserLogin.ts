// src/composables/useAuth.ts
import { jwtDecode } from 'jwt-decode';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../../api/axios';
import { User } from '../../../types/User';
import { useRole } from '../../UseRole';

interface DecodedToken {
  sub: number;
  email: string;
  rol: number;
  esPremium: boolean;
  exp: number;
  iat: number;
}

const token = ref<string | null>(localStorage.getItem('token'));
const user = ref<User | null>(
  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null
);
const loading = ref(false);
const error = ref<string | null>(null);

export function useAuthLogin() {
  const router = useRouter();
  const { updateRole } = useRole();

  const login = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;

    try {
      const res = await api.post(
        '/auth/login',
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
        customer_id: user.value?.customer_id
      };

      localStorage.setItem('token', token.value!);
      localStorage.setItem('user', JSON.stringify(safeUser));

    } catch (err: any) {
      error.value = err.response?.data?.messages?.error || 'Error al iniciar sesión';
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('productsInCart');
    updateRole();
    router.push('/login');
  };

  const isLoggedIn = computed(() => !!token.value);

  const loadUser = () => {
    const stored = localStorage.getItem('user');
    if (stored) {
      user.value = JSON.parse(stored);
    }
  };

  const decodedToken = computed<DecodedToken | null>(() => {
    if (!token.value) return null;
    try {
      return jwtDecode(token.value) as DecodedToken;
    } catch (e) {
      console.error('Error decodificando el token:', e);
      return null;
    }
  });

  const esPremium = computed(() => decodedToken.value?.esPremium === true);
  // ✅ NUEVA función refreshAuth
  function refreshAuth() {
    const newToken = localStorage.getItem('tok en');
    token.value = newToken;

    if (newToken) {
      try {
        const decoded = jwtDecode(newToken) as DecodedToken;
        user.value = {
          id_usuario: decoded.sub,
          nombre: '',
          email: decoded.email,
          password: '',
          rol: decoded.rol,
          id_suscripcion: 0,
          created_at: new Date(),
          updated_At: new Date(),
          customer_id: ''
        };
      } catch (error) {
        console.error('Error decodificando el token:', error);
        user.value = null;
      }
    } else {
      user.value = null;
    }
  }

  return {
    user,
    token,
    loading,
    error,
    login,
    logout,
    isLoggedIn,
    loadUser,
    esPremium,
    refreshAuth // 🔥 ahora lo exportamos
  };
}
