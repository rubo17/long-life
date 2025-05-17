// src/composables/api/empleados/useEmpleados.ts
import { notify } from '@kyvg/vue3-notification';
import { ref } from 'vue';
import api from '../../../api/axios';

export function useEmpleados() {
  const empleados = ref<any[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

const empleado = ref({
  id_usuario: '', // 👈 ID del usuario vinculado
  nombre: '',
  email: '',
  tipo: '',
  descripcion: '',
  imagenFile: null as File | null,
});
  const currentPage = ref(1);
  const perPage = ref(10);

  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  });

  const fetchEmpleados = async () => {
    loading.value = true;
    try {
      const res = await api.get('/empleados', {
        params: {
          page: currentPage.value,
          perPage: perPage.value,
        },
      });
      empleados.value = res.data.data;
      pagination.value = res.data.pagination;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error al cargar empleados';
    } finally {
      loading.value = false;
    }
  };

  const createFormData = () => {
    const formData = new FormData();
    formData.append('id_usuario', empleado.value.id_usuario);
    formData.append('nombre', empleado.value.nombre);
    formData.append('email', empleado.value.email);
    formData.append('telefono', empleado.value.descripcion);
    formData.append('tipo', empleado.value.tipo);

    if (empleado.value.imagenFile) {
      formData.append('imagen', empleado.value.imagenFile);
    }

    return formData;
  };

  const createEmpleado = async () => {
    const formData = createFormData();
    try {
      await api.post('/empleados', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      notify({ type: 'success', title: 'Empleado creado correctamente' });
      await fetchEmpleados();
    } catch (err) {
      console.error('Error al crear empleado:', err);
      notify({ type: 'error', title: 'Error al crear empleado' });
    }
  };

  const editEmpleado = async (id: number) => {
    const formData = createFormData();
    try {
      await api.post(`/updateEmpleado/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      notify({ type: 'success', title: 'Empleado actualizado correctamente' });
      await fetchEmpleados();
    } catch (err) {
      console.error('Error al actualizar empleado:', err);
      notify({ type: 'error', title: 'Error al actualizar empleado' });
    }
  };

  const deleteEmpleado = async (id: number) => {
    try {
      await api.delete(`/empleados/${id}`);
      notify({ type: 'success', title: 'Empleado eliminado correctamente' });
      await fetchEmpleados();
    } catch (err) {
      console.error('Error al eliminar empleado:', err);
      notify({ type: 'error', title: 'Error al eliminar empleado' });
    }
  };

  return {
    empleados,
    empleado,
    loading,
    error,
    fetchEmpleados,
    createEmpleado,
    editEmpleado,
    deleteEmpleado,
    currentPage,
    perPage,
    pagination,
  };
}
