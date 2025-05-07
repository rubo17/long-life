// src/composables/api/productos/UseProducts.ts
import { ref } from 'vue';
import api from '../../../api/axios';

export function useProducts() {
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
  const perPage = ref(6)

  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    total: 0
  })

  const fetchProducts = async () => {
    loading.value = true;
    try {
      const res = await api.get('/products', {
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

  return {
    products,
    producto,
    loading,
    error,
    fetchProducts,
    currentPage,
    perPage,
    pagination
  };
}
