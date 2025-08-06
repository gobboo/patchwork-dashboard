<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import type { IStreamsResponse } from "~/types";

const { $api } = useNuxtApp();
const toast = useToast();

const search = ref("");

const { data: streams, refresh } = await useLazyAsyncData<IStreamsResponse[]>(
  "streamers",
  () => $api("/streams")
);

async function deleteStreamer(id: string) {
	console.log(id)

  try {
    const confirmed = await useConfirmation({
      title: "Remove Streamer",
      description:
        "Are you sure you want to delete this streamer? Patchwork will stop recording this streamer in future, and all existings clips will be removed when they expire.",
    });
		
    if (!confirmed) return;

    await $api(`/streams/${id}`, { method: "DELETE" });

		toast.add({
      color: "success",
      description: `Successfully removed a streamer from Patchwork.`,
    });

		refresh()
  } catch {}
}

const filteredSteamers = computed(() =>
  streams.value?.filter((streamer) => streamer.username.includes(search.value))
);
</script>

<template>
  <UModal
    title="Your Streamers"
    description="Manage all the streamers patchwork is currently recording."
  >
    <slot />

    <template #body>
      <UInput
        v-model="search"
        placeholder="Search streamers"
        icon="i-lucide-search"
        class="block mb-6"
      />

      <ul role="list" class="divide-y divide-default">
        <li
          v-for="(streamer, index) in filteredSteamers"
          :key="index"
          class="flex items-center justify-between gap-3 py-3"
        >
          <div class="flex items-center gap-3 min-w-0">
            <UAvatar :alt="streamer.username" size="md" />

            <div class="text-sm min-w-0">
              <p class="text-highlighted font-medium truncate">
                {{ streamer.username }}
              </p>
              <p class="text-muted truncate">
                {{ streamer.type }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <UDropdownMenu
              :items="[
                {
                  label: 'Delete Streamer',
                  color: 'error',
                  onSelect: () => deleteStreamer(streamer._id),
                },
              ]"
              :content="{ align: 'end' }"
            >
              <UButton
                icon="i-lucide-ellipsis-vertical"
                color="neutral"
                variant="ghost"
              />
            </UDropdownMenu>
          </div>
        </li>
      </ul>
    </template>
  </UModal>
</template>
