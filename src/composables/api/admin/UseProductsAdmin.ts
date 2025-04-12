// src/composables/api/productos/UseProducts.ts
import axios from 'axios';
import { ref } from 'vue';

export function useProductsAdmin() {
  const products = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchProducts = async () => {
    loading.value = true;
    try {
      const response = await axios.get('http://localhost/longLifeBack/public/products');
      products.value = response.data;
    } catch (err) {
      console.error('Error al obtener productos:', err);
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    products,
    loading,
    error,
    fetchProducts
  };
}