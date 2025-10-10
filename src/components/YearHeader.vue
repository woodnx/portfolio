<script lang="ts" setup>
defineProps<{
  year: number;
}>();
</script>

<template>
  <div class="flex items-center gap-4 mb-4">
    <!-- 年の表示 -->
    <div class="flex-shrink-0 w-16 text-right">
      <div class="text-md lg:text-xl font-bold text-sky-600">{{ year }}</div>
    </div>

    <!-- 丸 -->
    <div class="relative flex-shrink-0 w-6 flex justify-center">
      <div
        class="w-5 h-5 rounded-full bg-sky-600 border-4 border-white z-10 relative"
      ></div>
    </div>

    <div class="flex-1"></div>
  </div>
</template>
