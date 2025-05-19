<template>
  <section class="max-w-4xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold mb-6">Política de Privacidad</h1>

    <p class="mb-4">
      En <strong>LongLife</strong>, nos comprometemos a proteger tu información personal. Esta política explica cómo recopilamos, usamos y protegemos tus datos.
    </p>

    <h2 class="text-xl font-semibold mt-6 mb-2">1. Información que recopilamos</h2>
    <ul class="list-disc list-inside mb-4">
      <li>Nombre, correo electrónico, dirección y otros datos de contacto.</li>
      <li>Información sobre tus compras y servicios contratados.</li>
      <li>Datos de salud y condición física (si aplican).</li>
    </ul>

    <h2 class="text-xl font-semibold mt-6 mb-2">2. Cómo usamos tu información</h2>
    <p class="mb-4">
      Utilizamos tus datos para brindarte un mejor servicio, personalizar tu experiencia, procesar pagos y ofrecerte contenido relevante.
    </p>

    <h2 class="text-xl font-semibold mt-6 mb-2">3. Compartir información</h2>
    <p class="mb-4">
      No compartimos tus datos con terceros salvo que sea necesario para prestarte el servicio o por obligación legal.
    </p>

    <h2 class="text-xl font-semibold mt-6 mb-2">4. Seguridad</h2>
    <p class="mb-4">
      Aplicamos medidas de seguridad físicas, electrónicas y administrativas para proteger tus datos.
    </p>

    <h2 class="text-xl font-semibold mt-6 mb-2">5. Tus derechos</h2>
    <p class="mb-4">
      Puedes acceder, corregir o eliminar tus datos personales en cualquier momento. Para hacerlo, contáctanos a través de nuestro correo de soporte.
    </p>

    <h2 class="text-xl font-semibold mt-6 mb-2">6. Cambios a esta política</h2>
    <p class="mb-4">
      Nos reservamos el derecho de modificar esta política. Te notificaremos cualquier cambio importante.
    </p>

    <p class="mt-6 text-sm text-gray-500 dark:text-gray-400">
      Última actualización: {{ fechaActual }}
    </p>
  </section>
</template>

<script setup>
const fechaActual = new Date().toLocaleDateString()
</script>
