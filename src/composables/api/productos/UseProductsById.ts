import { ref } from 'vue';
import api from '../../../api/axios';

import { Product } from '../../../types/Product';

export function useProductById(id: string) {
  const product = ref<Product | null>(null);
  const loading = ref(true);
  const error = ref(false);

  const fetchProduct = async () => {
    try {
      const res = await api.get<Product[]>(`/products/${id}`);
      product.value = res.data[0];
    } catch (err) {
      console.error(err);
      error.value = true;
    } finally {
      loading.value = false;
    }
  };

  return { product, loading, error,fetchProduct };
}
