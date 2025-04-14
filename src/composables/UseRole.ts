// composables/useRole.ts
import { jwtDecode } from 'jwt-decode';
import { ref } from 'vue';

const isAdmin = ref(false);

export function useRole() {
  const updateRole = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        isAdmin.value = decoded.rol == 1;
      } catch {
        isAdmin.value = false;
      }
    } else {
      isAdmin.value = false;
    }
  };

  return {
    isAdmin,
    updateRole
  };
}
