// src/composables/api/users/useUsers.ts
import axios from 'axios';
import { ref } from 'vue';

export function useUsers() {
  const users = ref([]);
  const loading = ref(false);
  const error = ref("");

  const nuevo = ref({
    nombre: '',
    email: '',
    password: '',
    rol: 0,
    id_suscripcion: 0
  });
  const currentPage = ref(1)
  const perPage = ref(10)

  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    total: 0
  })
  const fetchUsers = async () => {
    loading.value = true;
    try {
      const res = await axios.get('http://localhost/longLifeBack/public/users', {
        params: {
          page: currentPage.value,
          perPage: perPage.value
        }
      })
      users.value = res.data.data;
      pagination.value = res.data.pagination

    } catch (err) {
      console.error(err);
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const crearUsuario = async () => {
    try {
      await axios.post('http://localhost/longLifeBack/public/users', nuevo.value);
      await fetchUsers();
      nuevo.value.nombre=''
      nuevo.value.email=''
      nuevo.value.password=''
      nuevo.value.rol=1
      nuevo.value.id_suscripcion=1
    } catch (err) {
      console.error('Error al crear usuario:', err);
    }
  };

  const eliminarUsuario = async (id: number) => {
    try {
      await axios.delete(`http://localhost/longLifeBack/public/users/${id}`);
      await fetchUsers();
    } catch (err) {
      console.error('Error al eliminar usuario:', err);
      error.value="Error al eliminar usuario"
    }
  };
  const validationErrors = ref({
    nombre: '',
    email: '',
    password: '',
    rol: '',
    id_suscripcion: ''
  });

  const validate = () => {
    let valid = true;
    validationErrors.value = {
      nombre: '',
      email: '',
      password: '',
      rol: '',
      id_suscripcion: ''
    };

    if (!nuevo.value.nombre.trim()) {
      validationErrors.value.nombre = 'El nombre es obligatorio';
      valid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nuevo.value.email)) {
      validationErrors.value.email = 'Email inválido';
      valid = false;
    }
    if (!nuevo.value.password || nuevo.value.password.length < 6) {
      validationErrors.value.password = 'Mínimo 6 caracteres';
      valid = false;
    }

    return valid;
  };
  // puedes añadir `editarUsuario`, `resetNuevo`, etc.
  const editarUsuario = async (id:number)=> {
    try {
        await axios.put(`http://localhost/longLifeBack/public/users/${id}`, nuevo.value);
        await fetchUsers();
      } catch (err) {
        console.error('Error al editar el usuario:', err);
      }
  }
  return {
    users,
    loading,
    error,
    nuevo,
    fetchUsers,
    crearUsuario,
    eliminarUsuario,
    validate,
    validationErrors,
    editarUsuario,
    currentPage,
    perPage,
    pagination
  };
}
