// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@compodium/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],
  css: ["~/assets/css/main.css"],
  colorMode: {
    preference: "dark",
  },
	piniaPluginPersistedstate: {
		storage: 'cookies'
	},
	runtimeConfig: {
		public: {
			apiBase: ''
		}
	}
});
