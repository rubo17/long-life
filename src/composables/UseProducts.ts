import axios from 'axios';
import { onMounted, ref, Ref } from 'vue';

export interface Product {
  id_producto: string;
  nombre: string;
  meta_descripcion: string;
  descripcion: string;
  ingredientes: string;
  precio: number;
  id_categoria_producto: string;
  imagen: string;
  stock: string;
  estado: string;
}

export function UseProducts(id?: string): {
  
  products: Ref<Product | null>;
  loading: Ref<boolean>;
  error: Ref<boolean>;
  fetchProducts: () => Promise<void>;
} {
  const products = ref<Product | null>(null);
  const loading = ref(true);
  const error = ref(false);

  const fetchProducts = async () => {
    try {
      const url = id
        ? `http://localhost/longLifeBack/public/products/${id}`
        : `http://localhost/longLifeBack/public/products`;

      const response = await axios.get(url);
      // ✅ CORRECTO: Si es por ID, extrae el primer elemento
      products.value = id ? response.data[0] : response.data;
    } catch (err) {
      console.error("Error cargando productos:", err);
      error.value = true;
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchProducts);

  return { products, loading, error, fetchProducts };
}
