import { useSession } from '~/store/session';
export default defineNuxtRouteMiddleware((to, from) => {
  const { token, expiresAt } = useSession()

	if (!token || new Date() > expiresAt) {
		return navigateTo('/auth/sign-in')
	}
})
