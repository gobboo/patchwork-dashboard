<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  onCancel: {
    type: Function,
    default: () => {},
  },
  onConfirm: {
    type: Function,
    default: () => {},
  },
});
</script>

<template>
  <UModal :title="title" :description="description">
    <slot />

    <template #footer>
			<div class="ml-auto"></div>

      <UButton
        label="Cancel"
        color="neutral"
        @click="onCancel()"
      />

      <UButton loading-auto label="Confirm" color="error" variant="outline" @click="onConfirm()" />
    </template>
  </UModal>
</template>
