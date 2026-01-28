<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const { $api } = useNuxtApp();
const toast = useToast();
const open = ref(false);

/**
 * Backend-aligned schema
 */
const configSchema = z.object({
	clipLength: z
		.number()
		.min(60, "Minimum clip length is 60 seconds.")
		.max(120, "Maximum clip length is 120 seconds."),
	liveClippingEnabled: z.boolean(),
});

const schema = z.object({
	username: z.string().min(1, "Username is required."),
	platform: z.enum(["twitch", "youtube", "kick"]),
	config: configSchema,
});

type Schema = z.output<typeof schema>;

/**
 * Reactive form state
 */
const state = reactive<Schema>({
	username: "",
	platform: "youtube",
	config: {
		clipLength: 60,
		liveClippingEnabled: false,
	},
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
	try {
		await $api("/streamers/add", {
			method: "POST",
			body: state, // no stringify needed if $api wraps fetch
		});

		toast.add({
			color: "success",
			description: `Successfully added ${state.username} as a streamer.`,
		});

		open.value = false;
	} catch (err) {
		toast.add({
			color: "error",
			description: "Failed to add streamer.",
		});
	}
}
</script>

<template>
	<UModal v-model:open="open" title="Add Streamer" description="Enter the details below and we'll do the rest">
		<slot />

		<template #body>
			<UForm :schema="schema" :state="state" class="space-y-4 w-full" @submit="onSubmit">
				<!-- Username + Platform -->
				<div class="flex gap-x-2">
					<UFormField label="Username" name="username" required class="flex-1"
						description="Streamer username on the selected platform.">
						<UInput v-model="state.username" />
					</UFormField>

					<UFormField label="Platform" name="platform" required description="Streaming platform.">
						<USelectMenu v-model="state.platform" :items="[
							'twitch',
							'youtube',
							'kick'
						]" class="w-full" />
					</UFormField>
				</div>

				<!-- Config Section -->
				<UCard>
					<template #header>
						<span class="font-medium">Clip Configuration</span>
					</template>

					<div class="space-y-4">
						<UFormField label="Clip Length (seconds)" name="config.clipLength"
							description="Must be between 60 and 120 seconds.">
							<UInput v-model.number="state.config.clipLength" type="number" min="60" max="120" />
						</UFormField>

						<UFormField label="Live Clipping Enabled" name="config.liveClippingEnabled"
							description="Automatically clip while the streamer is live.">
							<UToggle v-model="state.config.liveClippingEnabled" />
						</UFormField>
					</div>
				</UCard>

				<UButton type="submit" block size="lg" loading-auto>
					Add Streamer
				</UButton>
			</UForm>
		</template>
	</UModal>
</template>
