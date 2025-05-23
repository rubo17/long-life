// src/composables/api/users/useUsers.ts
import { notify } from '@kyvg/vue3-notification';
import { ref } from 'vue';
import api from '../../../api/axios';
export function useUsers() {
  const users = ref<any>([]);
  const totalUsuariosActivos = ref(0)
  const loading = ref(false);
  const error = ref("");
  const nuevo = ref({
    nombre: '',
    email: '',
    password: '',
    rol: 0,
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
      const res = await api.get('/users', {
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
      await api.post('/users', nuevo.value);
      await fetchUsers();
      nuevo.value.nombre=''
      nuevo.value.email=''
      nuevo.value.password=''
      nuevo.value.rol=1
      notify({ type: 'success', title: 'Usuario creado correctamente' });
    } catch (err) {
      console.error('Error al crear usuario:', err);
      notify({ type: 'error', title: 'Error al crear el usuario' });

    }
  };

  const eliminarUsuario = async (id: number) => {
    try {
      await api.delete(`/users/${id}`);
      await fetchUsers();
      notify({ type: 'success', title: 'Usuario eliminado correctamente' });
    } catch (err) {
      console.error('Error al eliminar usuario:', err);
      notify({ type: 'error', title: 'Error al eliminar el usuario' });
      error.value="Error al eliminar usuario"
    }
  };

const getTotalUsers = async () => {
  try {
    const { data } = await api.get('/usuarios/activos/total')
    totalUsuariosActivos.value = data.totalActivos
  } catch (err) {
    console.error('Error al obtener el total de usuarios:', err)
    notify({
      type: 'error',
      title: 'Error',
      text: 'No se pudo traer el total de usuarios activos'
    })
  }
}

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
    if (nuevo.value.password==""){
      valid=true;
    }

    return valid;
  };
  // puedes añadir `editarUsuario`, `resetNuevo`, etc.
  const editarUsuario = async (id:number)=> {
    try {
        await api.put(`/users/${id}`, nuevo.value);
        await fetchUsers();
        notify({ type: 'success', title: 'Usuario editado correctamente' });
      } catch (err) {
        console.error('Error al editar el usuario:', err);
        notify({ type: 'error', title: 'Error al editar el usuario' });

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
    pagination,
    getTotalUsers,
    totalUsuariosActivos
  };
}
