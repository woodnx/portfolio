<script lang="ts" setup>
import dayjs from "dayjs";

defineProps<{
  category: string;
  title: string;
  description?: string;
  date: string;
}>();
</script>

<template>
  <div class="flex items-start gap-4">
    <!-- 月の表示 -->
    <div class="flex-shrink-0 w-16 text-right">
      <div class="text-sm text-gray-600">{{ dayjs(date).format("MMM") }}</div>
    </div>

    <!-- 丸 -->
    <div class="relative flex-shrink-0 w-6 flex justify-center">
      <div
        class="w-2 h-2 rounded-full bg-sky-600 z-10 relative"
        style="top: calc(var(--spacing) * 1.5)"
      ></div>
    </div>

    <!-- コンテンツ -->
    <div class="flex-1 pb-2">
      <div v-if="description && description.length != 0">
        <div
          class="bg-white p-4 rounded-tr-4xl rounded-bl-4xl rounded-tl-lg rounded-br-lg"
        >
          <h3 class="font-semibold text-lg text-sky-600 mb-2">
            {{ title }}
          </h3>
          <p class="text-neutral-600">{{ description }}</p>
        </div>
      </div>
      <div v-else>
        <p class="text-neutral-600">{{ title }}</p>
      </div>
    </div>
  </div>
</template>
