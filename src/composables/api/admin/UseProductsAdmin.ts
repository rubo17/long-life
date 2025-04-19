// src/composables/api/productos/UseProducts.ts
import { notify } from '@kyvg/vue3-notification';
import axios from 'axios';
import { ref } from 'vue';

export function useProductsAdmin() {
  const products = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const producto = ref({
    nombre: '',
    meta_descripcion: '',
    descripcion: '',
    ingredientes: '',
    categoria: '',
    precio: 0,
    stock: 0,
    estado: '',
    imagenFile: null as File | null,
  });
  
  const currentPage = ref(1)
  const perPage = ref(10)

  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    total: 0
  })

  const fetchProducts = async () => {
    loading.value = true;
    try {
      const res = await axios.get('http://localhost/longLifeBack/public/products', {
        params: {
          page: currentPage.value,
          perPage: perPage.value
        }
      })
        products.value = res.data.data;
        pagination.value = res.data.pagination

    } catch (err) {
      console.error('Error al obtener productos:', err);
      error.value = err;
    } finally {
      loading.value = false;
    }
  };
  const createFormData = () => {
    const formData = new FormData();
    formData.append('nombre', producto.value.nombre);
    formData.append('meta_descripcion', producto.value.meta_descripcion);
    formData.append('descripcion', producto.value.descripcion);
    formData.append('ingredientes', producto.value.ingredientes);
    formData.append('categoria', producto.value.categoria);
    formData.append('estado', producto.value.estado);
    formData.append('precio', producto.value.precio.toString());
    formData.append('stock', producto.value.stock.toString());
  
    if (producto.value.imagenFile) {
      formData.append('imagen', producto.value.imagenFile);
    }
  
    return formData;
  };
  
  const createProduct = async () => {
    const formData = createFormData();

    if (producto.value.imagenFile) {
      formData.append('imagen', producto.value.imagenFile);
    }

    try {
      await axios.post('http://localhost/longLifeBack/public/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      notify({ type: 'success', title: 'Producto creado correctamente' });
      await fetchProducts(); // recarga lista
    } catch (err) {
      console.error('Error al crear producto:', err);
      notify({ type: 'error', title: 'Error al crear producto' });
    }
  };

  const deleteProduct = async (id:number)=> {
    try {
      await axios.delete(`http://localhost/longLifeBack/public/products/${id}`);
      notify({ type: 'success', title: 'Producto eliminado correctamente' });
      await fetchProducts();
    } catch (err) {
      console.error('Error al crear producto:', err);
      notify({ type: 'error', title: 'Error al eliminar el producto' });
    }
  }
  const editProduct = async (id: number) => {
    const formData = createFormData();
  
    try {
      await axios.post(`http://localhost/longLifeBack/public/updateProduct/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      notify({ type: 'success', title: 'Producto editado correctamente' });
      await fetchProducts();
    } catch (err) {
      console.error("Error al editar el producto:", err);
      notify({ type: 'error', title: 'Error al editar el producto' });
    }
  };

  return {
    products,
    producto,
    loading,
    error,
    fetchProducts,
    createProduct,
    deleteProduct,
    editProduct,
    currentPage,
    perPage,
    pagination
  };
}
