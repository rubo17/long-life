<template>
    

<footer class="bg-gray-900">
    <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div class="md:flex md:justify-between">
          <div class="mb-6 md:mb-0">
              <div  class="flex items-center">
                  <img src="/images/longlife.webp" class="  h-20 w-20 me-3" alt="FlowBite Logo" />
                  <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Long Life</span>
                </div>
          </div>
          <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                  <h2 class="mb-6 text-sm font-semibold uppercase text-white">Contactanos</h2>
                  <ul class="text-gray-500 dark:text-gray-400 font-medium">
                      <li class="mb-4">
                            <RouterLink to="/contacto" class="hover:underline">Contacto</RouterLink>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">SIGUENOS</h2>
                  <ul class="text-gray-500 dark:text-gray-400 font-medium">
                      <li class="mb-4">
                          <a target="_blank" href="https://github.com/rubo17" class="hover:underline ">Github</a>
                      </li>
                      <li>
                          <a target="_blank" href="https://www.linkedin.com/in/ruben-cabrerizo-274a3532b/" class="hover:underline">Linkedin</a>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                  <ul class="text-gray-500 dark:text-gray-400 font-medium">
                      <li class="mb-4">
                          <RouterLink to="/politicaPrivacidad" class="hover:underline">Politica y Privacidad</RouterLink>
                      </li>
                      <li>
                          <RouterLink to="/terminosCondiciones" class="hover:underline">Terminios y Condiciones</RouterLink>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {{ añoActual }} <a href="/inicio" class="hover:underline">Longlife</a>. Aplicacion realizada con fines academicos.
          </span>
            <div class="flex mt-4 sm:justify-center sm:mt-0">
            <!-- GitHub -->
            <a
                href="https://github.com/rubo17"
                target="_blank"
                class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
                </svg>
                <span class="sr-only">GitHub</span>
            </a>

            <!-- Instagram -->
            <a
                href="https://www.instagram.com/_ruubeenn17/"
                target="_blank"
                class="ms-5 text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7.5 2A5.5 5.5 0 0 0 2 7.5v9A5.5 5.5 0 0 0 7.5 22h9a5.5 5.5 0 0 0 5.5-5.5v-9A5.5 5.5 0 0 0 16.5 2h-9ZM4 7.5A3.5 3.5 0 0 1 7.5 4h9A3.5 3.5 0 0 1 20 7.5v9a3.5 3.5 0 0 1-3.5 3.5h-9A3.5 3.5 0 0 1 4 16.5v-9Zm12.75-1.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5ZM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2.5 4a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Z"/>
                </svg>
                <span class="sr-only">Instagram</span>
            </a>

            <!-- LinkedIn -->
            <a
                href="https://www.linkedin.com/in/ruben-cabrerizo-274a3532b/"
                target="_blank"
                class="ms-5 text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.452 20.452h-3.845v-5.568c0-1.327-.025-3.037-1.85-3.037-1.85 0-2.134 1.444-2.134 2.937v5.668H8.78V9h3.688v1.561h.053c.513-.973 1.767-1.998 3.633-1.998 3.886 0 4.602 2.56 4.602 5.891v5.998zM5.337 7.433a2.227 2.227 0 1 1 .001-4.454 2.227 2.227 0 0 1-.001 4.454zM3.45 20.452h3.776V9H3.45v11.452z"/>
                </svg>
                <span class="sr-only">LinkedIn</span>
            </a>
            </div>

      </div>
    </div>
</footer>

</template>

<script setup>
import { RouterLink } from 'vue-router';

    const añoActual = new Date().getFullYear();
    
</script>
