<script lang="ts" setup>
import dayjs from "dayjs";

defineProps<{
  category: string;
  title: string;
  description?: string;
  date: string;
  link?: string;
}>();
</script>

<template>
  <div class="flex items-start gap-4">
    <!-- 月の表示 -->
    <div class="shrink-0 w-16 text-right">
      <div class="text-sm text-gray-600">{{ dayjs(date).format("MMM") }}</div>
    </div>

    <!-- 丸 -->
    <div class="relative shrink-0 w-6 flex justify-center">
      <div
        class="w-2 h-2 rounded-full bg-sky-600 z-10 relative"
        style="top: calc(var(--spacing) * 1.5)"
      ></div>
    </div>

    <!-- コンテンツ -->
    <div class="flex-1 pb-2">
      <div v-if="description && description.length != 0">
        <div class="bg-white p-4 rounded-2xl">
          <a
            v-if="link"
            class="font-semibold text-lg text-sky-600 mb-2 underline"
            :href="link"
          >
            {{ title }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="inline-block size-5"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 15l6 -6" />
              <path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
              <path
                d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463"
              />
            </svg>
          </a>
          <h3 v-else class="font-semibold text-lg text-sky-600 mb-2">
            {{ title }}
          </h3>
          <p class="text-neutral-600">{{ description }}</p>
        </div>
      </div>
      <div v-else>
        <a v-if="link" class="text-neutral-600 underline" :href="link">
          {{ title }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="inline-block size-5"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 15l6 -6" />
            <path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
            <path
              d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463"
            />
          </svg>
        </a>
        <p v-else class="text-neutral-600">{{ title }}</p>
      </div>
    </div>
  </div>
</template>
