<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const { $api } = useNuxtApp();

const schema = z.object({
  username: z.string(),
  type: z.enum(["youtube", "twitch", "kick"]),
  webhook: z
    .string()
    .url("Must be a URL.")
    .includes("https://discord.com/api/webhooks", {
      message: "URL must be a valid discord webhook URL.",
    })
    .optional(),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  username: undefined,
  type: "youtube",
  webhook: undefined,
});

const toast = useToast();

const open = ref(false);
async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await $api("/streams", {
      method: "POST",
      body: JSON.stringify(state),
    });

    toast.add({
      color: "success",
      description: `Successfully added ${state.username} as a streamer to Patchwork.`,
    });

    open.value = false;
  } catch {}
}
</script>

<template>
  <UModal
    v-model:open="open"
    title="Add Streamer"
    description="Enter the details below and we'll do the rest"
  >
    <slot />

    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4 w-full"
        @submit="onSubmit"
      >
        <div class="flex gap-x-2">
          <UFormField
            label="Username"
            name="username"
            required
            class="flex-1"
            description="Username of the streamer on said platform."
          >
            <UInput v-model="state.username" required class="block" />
          </UFormField>

          <UFormField
            label="Platform"
            name="type"
            required
            description="Site the streamer stream on."
          >
            <USelectMenu
              v-model="state.type"
              :items="['youtube', 'twitch', 'kick']"
              required
              class="w-full"
            />
          </UFormField>
        </div>

        <UFormField
          label="Webhook"
          name="webhook"
          description="Discord webhook, which will be used to post said clips."
        >
          <UInput v-model="state.webhook" class="block" />
        </UFormField>

        <UButton type="submit" block size="lg" loading-auto>
          Add Streamer
        </UButton>
      </UForm>
    </template>
  </UModal>
</template>
