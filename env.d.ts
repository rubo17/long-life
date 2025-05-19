/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_STRIPE_PUBLIC_KEY: string
  // agrega más variables si las necesitas
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
