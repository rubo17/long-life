import axios from 'axios';
import { ref } from 'vue';
import { Product } from '../../../types/Product';

// Para obtener TODOS los productos
export function useProducts() {
  const products = ref<Product[]>([]);
  const loading = ref(true);
  const error = ref(false);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost/longLifeBack/public/products');
      products.value = res.data.data;
    } catch (err) {
      error.value = true;
    } finally {
      loading.value = false;
    }
  };

  return { products, loading, error, fetchProducts};
}
