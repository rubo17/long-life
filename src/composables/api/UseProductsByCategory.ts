import axios from 'axios';
import { onMounted, ref } from 'vue';
import { Product } from '../../types/Product';

export function useProductsByCategory(id: string) {
  const products = ref<Product[]>([]);
  const loading = ref(true);
  const error = ref(false);

  const fetchProducts = async () => {
    try {
      const res = await axios.get<Product[]>(`http://localhost/longLifeBack/public/productsByCategory/${id}`);
      products.value = res.data;
    } catch (err) {
      console.error(err);
      error.value = true;
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchProducts);

  return { products, loading, error,fetchProducts };
}
