import { ref, watch } from 'vue';
import api from '../../../api/axios';
import { Product } from '../../../types/Product';

const cart = ref<Product[]>([]);
const error = ref('');

// Cargar del localStorage solo una vez al iniciar
const loadCart = async () => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const res = await api.get('/carrito', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const serverCart = res.data;
      cart.value = serverCart.productos || [];
      localStorage.setItem('productsInCart', JSON.stringify(serverCart.productos || []));
      return;
    } catch (e) {
      console.error("Error al obtener el carrito del backend:", e);
    }
  }

  // Fallback
  const stored = localStorage.getItem('productsInCart');
  if (stored) {
    try {
      cart.value = JSON.parse(stored);
    } catch (e) {
      console.error("Error al parsear el carrito:", e);
      cart.value = [];
    }
  }
};

// Guardar cada vez que el carrito cambie
watch(cart, (newVal) => {
  localStorage.setItem('productsInCart', JSON.stringify(newVal));
}, { deep: true });

const removeFromCart = async (id_producto: string) => {
  error.value = '';
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    await api.delete(`/carrito/${id_producto}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    cart.value = cart.value.filter(p => p.id_producto !== id_producto);
  } catch (e) {
    console.error('Error al eliminar del carrito:', e);
  }
};

const addToCart = async (product: Product) => {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    await api.post('/carrito/add', {
      id_producto: product.id_producto,
      cantidad: product.cantidad || 1
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    await loadCart();
  } catch (e) {
    console.error(e);
  }
};

const clearCart = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      await api.delete('/carrito/clear', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      cart.value = [];
    } catch (e) {
      console.error("Error al limpiar carrito:", e);
    }
  }
};

const getTotal = () => {
  return cart.value.reduce((total, item) => total + item.precio * item.cantidad, 0);
};

const getItemCount = () => {
  return cart.value.reduce((count, item) => count + item.cantidad, 0);
};

const updateCantidad = async (id_producto: string, cantidad: number) => {
  error.value = '';
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const res = await api.put(`/carrito/${id_producto}`, { cantidad }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const item = cart.value.find(p => p.id_producto === id_producto);
    if (item) item.cantidad = cantidad;
  } catch (e: any) {
    error.value = e.response?.data?.messages?.error || 'Error al actualizar cantidad';
    console.error('Error al actualizar cantidad:', error.value);
  }
};

export function useCart() {
  return {
    cart,
    addToCart,
    clearCart,
    getTotal,
    getItemCount,
    removeFromCart,
    loadCart,
    updateCantidad,
    error
  };
}
