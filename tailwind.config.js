/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{html,js}', // Asegúrate de que Tailwind vea tus archivos
    ],
    theme: {
      extend: {
        colors: {
          'primario': '#1E40AF', // Un color personalizado
          'secundario': '#10B981', // Otro color personalizado
          'fondo': '#F3F4F6', // Color de fondo
          // Agrega más colores según lo necesites
        },
      },
    },
    plugins: [],
  };
  