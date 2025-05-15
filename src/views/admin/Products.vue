<template>
  <div class="container mx-auto p-6 space-y-10">
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold mb-4">Productos</h1>
      <CreateButton text="Crear Producto" @click="comenzarCreacion" />
    </div>

    <div v-if="loading">Cargando productos...</div>
    <div v-else-if="error">Error al cargar los productos.</div>

    <BaseTable :columns="columns" :data="products" showActions>

      <template #actions="{ row }">
        <div class="flex gap-5">
          <button @click="comenzarEdicion(row)" class="text-blue-600 hover:underline text-sm cursor-pointer">
            Editar
          </button>
          <button @click="confirmdeleteProduct(row.id_producto)"
            class="text-red-600 hover:underline ml-3 text-sm cursor-pointer">
            Eliminar
          </button>
        </div>
      </template>
    </BaseTable>
    <Modal :open="showModal" @close="showModal = false">
      <h2 class="text-2xl text-center font-bold mb-6 text-gray-800">
        {{ modoEdicion ? 'Editar Producto' : 'Nuevo Producto' }}
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div class="flex gap-5">
          <div class="">
            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input v-model="producto.nombre" type="text" placeholder="Nombre"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
              required />
          </div>

          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Meta Descripcion</label>
            <textarea v-model="producto.meta_descripcion" rows="2"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
              placeholder="Descripción breve del producto" required />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea v-model="producto.descripcion" rows="2"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
            placeholder="Descripción breve del producto" required />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Ingredientes</label>
          <textarea v-model="producto.ingredientes" rows="2"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
            placeholder="Ej: proteína, avena, fruta..." />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
          <select v-model="producto.categoria"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
            required>
            <option disabled value="">Selecciona una categoria</option>
            <option value="1">Nutricionn Diaria y bienestar</option>
            <option value="2">Rendimiento Deportivo</option>
            <option value="3">Cuidado de piel y cuerpo</option>
          </select>
        </div>
        <div class="flex gap-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Precio (€)</label>
            <input v-model="producto.precio" type="number" step="0.01"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
              placeholder="0.00" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input v-model="producto.stock" type="number"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
              placeholder="Cantidad disponible" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <input v-model="producto.estado" type="text" placeholder="Estado"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
              required />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Imagen del Producto</label>
          <div class="flex items-center justify-between gap-4">
            <!-- Vista previa opcional -->
            <img v-if="previewUrl" :src="previewUrl" alt="Vista previa"
              class="w-40 h-40 object-cover rounded-md border border-gray-300" />
            <!-- Input personalizado -->
            <label for="imagenUpload"
              class="cursor-pointer flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-600 hover:border-green-500 hover:text-green-600 transition w-full">
              📁 Seleccionar Imagen
              <input id="imagenUpload" type="file" class="hidden" @change="onFileChange" />
            </label>
          </div>
        </div>
        <div class="pt-2">
          <button type="submit"
            class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow transition cursor-pointer">
            {{ modoEdicion ? 'Actualizar Producto' : 'Crear Producto' }}
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
import { notify } from '@kyvg/vue3-notification'
import { onMounted, ref } from 'vue'
import CreateButton from '../../components/admin/buttons/CreateButton.vue'
import BaseTable from '../../components/admin/ui/BaseTable.vue'
import Modal from '../../components/admin/ui/Modal.vue'
import Paginator from '../../components/Paginator.vue'
import { useProductsAdmin } from '../../composables/api/admin/UseProductsAdmin'
const showModal = ref(false)
const modoEdicion = ref(false)
const { producto, createProduct, deleteProduct, editProduct, fetchProducts, products, loading, error, currentPage,pagination} = useProductsAdmin()
const previewUrl = ref<string | null>(null);

const confirmdeleteProduct = async (id: number) => {
  if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) return;
  await deleteProduct(id); // del composable
};
const productoEditandoId = ref<number | null>(null)

const comenzarCreacion = () => {
  modoEdicion.value = false
  producto.value = { nombre: '', descripcion: '', meta_descripcion: '', ingredientes: '', categoria: '', precio: 0, stock: 0, estado: '',imagenFile: null }
  showModal.value = true
}
const comenzarEdicion = async (product: any) => {
  modoEdicion.value = true
  productoEditandoId.value = product.id_producto;
  producto.value = { nombre: product.nombre, descripcion: product.descripcion, meta_descripcion: product.meta_descripcion, ingredientes: product.ingredientes, categoria: product.id_categoria_producto, precio: product.precio, stock: product.stock, estado: product.estado, imagenFile: null }
  showModal.value = true
}
const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    producto.value.imagenFile = file;
    previewUrl.value = URL.createObjectURL(file); // ⚡ genera la vista previa
  }
};
const handleSubmit = async () => {
  try {
    if (modoEdicion.value && productoEditandoId.value !== null) {
      await editProduct(productoEditandoId.value);
    } else {
      await createProduct();
    }
    showModal.value = false;
    producto.value = {
      nombre: '', descripcion: '', meta_descripcion: '', ingredientes: '',
      categoria: '', precio: 0, stock: 0, estado: '', imagenFile: null
    };
    productoEditandoId.value = null;
    modoEdicion.value = false;
    previewUrl.value = ""

  } catch (err) {
    console.error(err);
    notify({ type: 'error', title: 'Error al guardar el producto' });
  }
};

function handlePageChange(page: number) {
  currentPage.value = page
  fetchProducts()
}
onMounted(fetchProducts)

const columns = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'precio', label: 'precio' },
  { key: 'stock', label: 'Stock' },
  { key: 'estado', label: 'Estado' },
  { key: 'imagen', label: 'Imagen' }
]

</script>
