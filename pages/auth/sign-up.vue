<script setup lang="ts">
import { useSession } from '~/store/session'

const { isSigningIn, signIn } = useSession()

const token = ref('')

</script>

<template>
	<div class="h-screen w-screen flex items-center justify-center">
		<UCard class="flex-1 max-w-sm">
			<template #header>
				<div class="text-center">
					<h1 class="text-2xl font-medium text-white">
						Welcome back
					</h1>
					<p class="text-slate-300 mt-1">
						Use your API Key to sign in below
					</p>
				</div>
			</template>

			<div class="w-full">
				<UButton></UButton>

				<UButton @click="signIn(token)" color="primary" size="xl" class="mt-6" block :loading="isSigningIn">
					Continue
				</UButton>
			</div>
		</UCard>
	</div>
</template>