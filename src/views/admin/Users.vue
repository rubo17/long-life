<template>
  <div class="container mx-auto p-6 space-y-10">
    <div class="flex gap-5 md:justify-between items-center">
      <h1 class="text-xl md:text-2xl font-bold mb-4">Usuarios</h1>
      <CreateButton text="Crear Usuario" @click="comenzarCreacion()" />
    </div>
    <div v-if="loading">Cargando...</div>

    <BaseTable :columns="columns" :data="users" showActions>
      <template #actions="{ row }">
        <div class="flex gap-5">
          <button @click="comenzarEdicion(row)" class="text-blue-600 hover:underline text-sm cursor-pointer">
            Editar
          </button>
          <button @click="confirmarEliminacion(row.id_usuario)"
            class="text-red-600 hover:underline ml-3 text-sm cursor-pointer">
            Eliminar
          </button>
        </div>

      </template>
    </BaseTable>
    <Modal :open="showModal" @close="showModal = false">
      <h2 class="text-2xl text-center font-bold mb-6 text-gray-800">Nuevo Usuario</h2>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <!-- Nombre -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input v-model="nuevo.nombre" type="text" placeholder="Nombre"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
            required />
          <p class="text-sm text-red-600" v-if="validationErrors.nombre">{{ validationErrors.nombre }}</p>
        </div>
        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="nuevo.email" type="email" placeholder="Email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
            required />
          <p class="text-sm text-red-600" v-if="validationErrors.email">{{ validationErrors.email }}</p>
        </div>
        <!-- Contraseña -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input v-model="nuevo.password" type="password" placeholder="Contraseña"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
            required />
          <p class="text-sm text-red-600" v-if="validationErrors.password">{{ validationErrors.password }}</p>
        </div>
        <!-- Rol (select) -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Rol</label>
          <select v-model="nuevo.rol"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
            required>
            <option disabled value="">Selecciona un rol</option>
            <option value="1">Administrador</option>
            <option value="2">Cliente</option>
            <option value="3">Empleado</option>
          </select>
        </div>
        <!-- Suscripción (select) -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Suscripción</label>
          <select v-model="nuevo.id_suscripcion"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
            required>
            <option disabled value="">Selecciona una suscripción</option>
            <option value="1">Básica</option>
            <option value="2">Premium</option>
          </select>
        </div>
        <!-- Botón -->
        <div class="pt-2">
          <button type="submit"
            class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow transition cursor-pointer">
            {{ modoEdicion ? 'Editar Usuario' : 'Crear Usuario' }}
          </button>
        </div>
      </form>
    </Modal>
    <Paginator
         :currentPage="currentPage"
         :totalPages="pagination.totalPages"
         @changePage="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { notify } from "@kyvg/vue3-notification";
import { onMounted, ref } from 'vue';
import CreateButton from '../../components/admin/buttons/CreateButton.vue';
import BaseTable from '../../components/admin/ui/BaseTable.vue';
import Modal from '../../components/admin/ui/Modal.vue';
import Paginator from "../../components/Paginator.vue";
import { useUsers } from '../../composables/api/admin/UseUsers';

const showModal = ref(false);
const { users, nuevo, crearUsuario, fetchUsers, eliminarUsuario, loading, validate, validationErrors, editarUsuario, currentPage,pagination } = useUsers();

onMounted(fetchUsers);

const handleSubmit = async () => {
  const isValid = validate();
  if (!isValid) return;

  try {
    if (modoEdicion.value && usuarioEditandoId.value) {
      await editarUsuario(usuarioEditandoId.value);
      notify({ type: 'success', title: 'Usuario editado correctamente' });
    } else {
      await crearUsuario();
      notify({ type: 'success', title: 'Usuario creado correctamente' });
    }

    showModal.value = false;
    modoEdicion.value = false;
    usuarioEditandoId.value = null;

  } catch (err) {
    notify({
      type: 'error',
      title: 'Error al guardar usuario',
      text: 'Ocurrió un problema al procesar la solicitud'
    });
  }
};

const confirmarEliminacion = async (id: number) => {
  if (!confirm('¿Estás seguro de que quieres eliminar este usuario?')) return;
  await eliminarUsuario(id);
  notify({ type: 'success', title: 'Usuario eliminado correctamente' });

};

const modoEdicion = ref(false);
const usuarioEditandoId = ref<number | null>(null);

const comenzarEdicion = (usuario: any) => {
  modoEdicion.value = true;
  usuarioEditandoId.value = usuario.id_usuario;

  // Cargar los datos del usuario al formulario
  nuevo.value = {
    nombre: usuario.nombre,
    email: usuario.email,
    password: '', // ← por seguridad lo dejas vacío
    rol: usuario.rol,
    id_suscripcion: usuario.id_suscripcion
  };

  showModal.value = true;
};
const comenzarCreacion = () => {
  modoEdicion.value = false;
  showModal.value = true;

}
function handlePageChange(page: number) {
  currentPage.value = page
  fetchUsers()
}

const columns = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'email', label: 'Email' },
  { key: 'password', label: 'Contraseña' },
  { key: 'rol_nombre', label: 'Rol' },
];
</script>