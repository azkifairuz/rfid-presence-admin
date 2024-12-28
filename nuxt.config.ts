export default defineNuxtConfig({
  ssr: false,
  typescript: {
    shim: false,
  },
  app: {
    head: {
      title:
        "Dashboard presensi rfid",
    },
  },
  build: {
    transpile: ["vuetify"],
  },
  nitro: {
    serveStatic: true,
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3002', // Default untuk local development
    },
  },
  sourcemap: { server: false, client: false },
  devServerHandlers: [],
});
