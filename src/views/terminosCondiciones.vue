<template>
  <section class="max-w-4xl mx-auto mt-40 px-4 py-1">
    <h1 class="text-3xl font-bold mb-6">Términos y Condiciones</h1>

    <p class="mb-4">
      Bienvenido a <strong>LongLife</strong>. Al utilizar nuestros servicios, aceptas los siguientes términos. Por favor, léelos detenidamente.
    </p>

    <h2 class="text-xl font-semibold mt-6 mb-2">1. Aceptación de los términos</h2>
    <p class="mb-4">
      Al acceder y usar nuestro sitio o aplicación, aceptas cumplir con estos términos. Si no estás de acuerdo, por favor no utilices nuestros servicios.
    </p>

    <h2 class="text-xl font-semibold mt-6 mb-2">2. Servicios ofrecidos</h2>
    <p class="mb-4">
      Ofrecemos productos, asesoramiento nutricional, rutinas de entrenamiento y otros contenidos relacionados con la salud y el bienestar.
    </p>

    <h2 class="text-xl font-semibold mt-6 mb-2">3. Registro y cuentas</h2>
    <p class="mb-4">
      Para acceder a ciertos servicios, deberás crear una cuenta. Eres responsable de mantener la confidencialidad de tus credenciales.
    </p>

    <h2 class="text-xl font-semibold mt-6 mb-2">4. Suscripciones y pagos</h2>
    <p class="mb-4">
      Algunas funciones requieren una suscripción. Todos los pagos deben realizarse de forma oportuna. No se ofrecen reembolsos salvo que se indique lo contrario.
    </p>

    <h2 class="text-xl font-semibold mt-6 mb-2">5. Contenido del usuario</h2>
    <p class="mb-4">
      Puedes publicar comentarios u otros contenidos siempre que no sean ofensivos, ilegales o violen derechos de terceros. Nos reservamos el derecho de eliminar dicho contenido.
    </p>

    <h2 class="text-xl font-semibold mt-6 mb-2">6. Propiedad intelectual</h2>
    <p class="mb-4">
      Todo el contenido del sitio (textos, imágenes, videos, etc.) es propiedad de LongLife o de sus licenciantes. No está permitido copiar ni distribuir sin autorización.
    </p>

    <h2 class="text-xl font-semibold mt-6 mb-2">7. Modificaciones</h2>
    <p class="mb-4">
      Nos reservamos el derecho de modificar estos términos en cualquier momento. Se notificará a los usuarios en caso de cambios relevantes.
    </p>

    <h2 class="text-xl font-semibold mt-6 mb-2">8. Limitación de responsabilidad</h2>
    <p class="mb-4">
      No nos hacemos responsables por daños derivados del uso del sitio o de los servicios, incluidos problemas técnicos o pérdida de datos.
    </p>

    <h2 class="text-xl font-semibold mt-6 mb-2">9. Contacto</h2>
    <p class="mb-4">
      Para cualquier duda o reclamo, puedes contactarnos en: <a href="mailto:soporte@longlife.com" class="underline">soporte@longlife.com</a>.
    </p>

    <p class="mt-6 text-sm text-gray-500 dark:text-gray-400">
      Última actualización: {{ fechaActual }}
    </p>
  </section>
</template>

<script setup>
const fechaActual = new Date().toLocaleDateString()
</script>
