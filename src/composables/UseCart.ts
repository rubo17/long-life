import { ref, watch } from 'vue';
import { Product } from '../types/Product';

const cart = ref<Product[]>([]);

// Cargar del localStorage solo una vez al iniciar

const loadCart = async () => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const res = await fetch('http://localhost/longLifeBack/public/carrito', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const serverCart = await res.json();
        cart.value = serverCart.productos || [];
        localStorage.setItem('productsInCart', JSON.stringify(serverCart.productos || []));
        return;
      }
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
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const res = await fetch(`http://localhost/longLifeBack/public/carrito/${id_producto}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (res.ok) {
      cart.value = cart.value.filter(p => p.id_producto !== id_producto);
    } else {
      console.error('Error al eliminar del carrito:', await res.json());
    }
  } catch (e) {
    console.error('Error de conexión al eliminar del carrito:', e);
  }
};

const addToCart = async (product: Product) => {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const res = await fetch('http://localhost/longLifeBack/public/carrito/add', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_producto: product.id_producto,
        cantidad: product.cantidad || 1
      }),
    });

    if (res.ok) {
      const existing = cart.value.find(p => p.id_producto === product.id_producto);
      if (existing) {
        existing.cantidad += product.cantidad || 1;
      } else {
        cart.value.push({ ...product });
      }
    } else {
      console.error(await res.json());
    }
  } catch (e) {
    console.error(e);
  }
};

  

const clearCart = () => {
  cart.value = [];
};

const getTotal = () => {
  return cart.value.reduce((total, item) => total + item.precio * item.cantidad, 0);
};

const getItemCount = () => {
  return cart.value.reduce((count, item) => count + item.cantidad, 0);
};
const updateCantidad = async (id_producto: string, cantidad: number) => {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const res = await fetch(`http://localhost/longLifeBack/public/carrito/${id_producto}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cantidad })
    });

    if (res.ok) {
      const item = cart.value.find(p => p.id_producto === id_producto);
      if (item) item.cantidad = cantidad;
    } else {
      const error = await res.json();
      console.error('Error al actualizar cantidad:', error);
    }
  } catch (e) {
    console.error('Error en la petición al backend:', e);
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
    updateCantidad
  };
}
