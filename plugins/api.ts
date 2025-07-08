import { useSession } from "~/store/session";

export default defineNuxtPlugin((nuxtApp) => {
  const session = useSession();
	const config = useRuntimeConfig()

  const api = $fetch.create({
    baseURL: config.public.apiBase,
    onRequest({ request, options, error }) {
      console.log(session.token);
      if (session.token) {
        options.headers.set("x-api-key", session.token);
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo("/auth/sign-in"));
      }

      if (response.status === 400) {
        const toast = useToast();

        toast.add({
          color: "error",
          title: "Unsuccessful Request",

          description:
            response._data.message ||
            "An unknown error has occured, please contact support",
        });
      }
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
