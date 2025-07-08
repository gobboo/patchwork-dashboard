import type { IAuthAppResponse } from "~/types";

export const useSession = defineStore("session", {
  state: () => {
    return {
      appId: "",
      token: "",
      isSigningIn: false,
      expiresAt: new Date(),
    };
  },
  actions: {
    async signIn(token: string) {
      const toast = useToast();

      try {
        const { $api } = useNuxtApp();

        this.token = token;
        this.isSigningIn = true;

        const response = await $api<IAuthAppResponse>("/auth/app");

        this.appId = response.appId;
				this.expiresAt = new Date(response.expiresAt)

        toast.add({
          color: "success",
          description: `Successfully logged in as ${this.appId}\'s App.`,
        });

        navigateTo("/");
      } catch (error) {
        toast.add({
          color: "error",
          description:
            "Could not sign in with that API Key, make sure the key is valid.",
        });
      } finally {
        this.isSigningIn = false;
			}
    },
  },
	persist: true
});
