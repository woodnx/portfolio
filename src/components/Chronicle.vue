<script lang="ts" setup>
import { computed, ref } from "vue";
import Timeline from "./Timeline.vue";
import dayjs from "dayjs";

const props = defineProps<{
  items: {
    title: string;
    description: string;
    category: string;
    date: string;
  }[];
}>();

const activeCategory = ref("すべて");

const categories = computed(() => [
  "すべて",
  ...Array.from(new Set(props.items.map((item) => item.category))),
]);

const filteredItems = computed(() => {
  if (activeCategory.value === "すべて") return props.items;
  return props.items.filter((item) => item.category === activeCategory.value);
});

// 年ごとにグループ化
const itemsByYear = computed(() => {
  const grouped = filteredItems.value.reduce(
    (acc, item) => {
      const date = dayjs(item.date);
      const year = date.year();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(item);
      return acc;
    },
    {} as Record<number, typeof filteredItems.value>,
  );

  // 年でソート（降順）、各年内のアイテムも月で降順ソート
  return Object.entries(grouped)
    .sort(([a], [b]) => parseInt(b) - parseInt(a))
    .map(([year, items]) => ({
      year: parseInt(year),
      items: items.sort((a, b) => {
        const dateA = dayjs(a.date);
        const dateB = dayjs(b.date);
        return dateB.month() - dateA.month(); // 月で降順ソート
      }),
    }));
});
</script>

<template>
  <div class="flex gap-2 justify-center mb-6">
    <button
      v-for="category in categories"
      :key="category"
      class="px-3 py-1 rounded-full border transition font-bold"
      :class="
        activeCategory === category
          ? 'bg-sky-600 text-white border-sky-600'
          : 'bg-white text-gray-700 hover:bg-gray-100 border-neutral-300'
      "
      @click="activeCategory = category"
    >
      {{ category }}
    </button>
  </div>

  <div class="relative max-w-4xl mx-auto" id="timeline-container">
    <!-- 年ごとのセクション -->
    <div
      v-for="(yearGroup, yearIndex) in itemsByYear"
      :key="yearGroup.year"
      class="relative mb-8"
    >
      <!-- 年内のタイムライン -->
      <Timeline :items="yearGroup.items" :year="yearGroup.year" />

      <!-- 年の間のスペース（最後の年以外） -->
      <div v-if="yearIndex < itemsByYear.length - 1" class="mb-8"></div>
    </div>
  </div>
</template>
