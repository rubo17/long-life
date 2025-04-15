// src/composables/api/auth/useRegister.ts
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthLogin } from './UseUserLogin';

export function useRegister() {
  const nombre = ref('');
  const email = ref('');
  const password = ref('');
  const repeat_password = ref('');
  const emailError = ref('');
  const passwordError = ref('');
  const backendError = ref('');
  const successMessage = ref('');
  const loading = ref(false);

  const router = useRouter();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{6,}$/;

  const handleRegister = async () => {
    emailError.value = '';
    passwordError.value = '';
    backendError.value = '';
    successMessage.value = '';

    loading.value = true;
    let valid = true;

    if (password.value !== repeat_password.value) {
      passwordError.value = 'Las contraseñas deben coincidir';
      valid = false;
    }
    if (!emailRegex.test(email.value)) {
      emailError.value = 'Introduce un email válido';
      valid = false;
    }
    if (!passwordRegex.test(password.value)) {
      passwordError.value = 'La contraseña debe tener al menos 6 caracteres';
      valid = false;
    }

    if (!valid) {
      loading.value = false;
      return;
    }

    try {
      const res = await axios.post('http://localhost/longLifeBack/public/auth/register', {
        nombre: nombre.value,
        email: email.value,
        password: password.value,
      });

      const { token, user } = res.data;
      const safeUser = {
        id: user.id_usuario,
        name: user.nombre,
        email: user.email,
        rol: user.rol,
        suscripcion: user.id_suscripcion
      };

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(safeUser));
      
      const { login } = useAuthLogin();
      localStorage.setItem('user', JSON.stringify(safeUser));
      await login(email.value, password.value); // O 
      successMessage.value = 'Registro exitoso. Redirigiendo...';
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (err: any) {
      backendError.value =
        err.response?.data?.messages?.error ||
        err.response?.data?.message ||
        'Error al registrar';
    } finally {
      loading.value = false;
    }
  };

  return {
    nombre,
    email,
    password,
    repeat_password,
    emailError,
    passwordError,
    backendError,
    successMessage,
    loading,
    handleRegister
  };
}