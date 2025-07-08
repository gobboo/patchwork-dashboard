<script setup lang="ts">
defineProps<{
  title: string;
  icon: string;
  description: string;
  iconPlacement: "top" | "side";
  color: "blue" | "red" | "purple" | "orange";
}>();
</script>

<template>
  <div
    class="group p-6 rounded-md flex gap-x-5 hover:scale-[1.02] transition-all duration-300 items-center cursor-pointer overflow-hidden relative"
    :class="{
      'bg-blue-500': color === 'blue',
      'bg-red-500': color === 'red',
      'bg-purple-600': color === 'purple',
      'bg-orange-500': color === 'orange',
      'flex-col gap-y-3 items-start p-8': iconPlacement === 'top',
    }"
  >
    <div
      class="bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 w-16 h-12 rounded-md"
      :class="{
        'w-16 h-16': iconPlacement === 'top',
      }"
    >
      <UIcon
        :name="icon"
        class="h-6 w-6"
        :class="{
          'h-8 w-8': iconPlacement === 'top',
        }"
      />
    </div>

    <div>
      <p
        class="font-bold text-lg text-white mb-1"
        :class="{
          '!text-2xl': iconPlacement === 'top',
        }"
      >
        {{ title }}
      </p>

      <p class="text-blue-100 leading-relaxed">
        {{ description }}
      </p>
    </div>
  </div>
</template>
