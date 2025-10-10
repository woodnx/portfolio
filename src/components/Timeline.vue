<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue";
import TimelineItem from "./TimelineItem.vue";
import YearHeader from "./YearHeader.vue";
import dayjs from "dayjs";

defineProps<{
  items: {
    category: string;
    title: string;
    description: string;
    date: string;
  }[];
  year: number;
}>();

const timelineRef = ref<HTMLElement>();
const lineHeight = ref("0px");

const calculateLineHeight = async () => {
  await nextTick();
  if (timelineRef.value) {
    const timelineItems = timelineRef.value.querySelectorAll(".timeline-item");
    if (timelineItems.length > 1) {
      const firstItem = timelineItems[0];
      const lastItem = timelineItems[timelineItems.length - 1];

      const firstRect = firstItem.getBoundingClientRect();
      const lastRect = lastItem.getBoundingClientRect();
      const containerRect = timelineRef.value.getBoundingClientRect();

      const startY = firstRect.top - containerRect.top;
      const endY = lastRect.top - containerRect.top + 3; // 小丸の中心まで

      lineHeight.value = `${endY - startY}px`;
    }
  }
};

onMounted(() => {
  calculateLineHeight();

  // ウィンドウリサイズ時の再計算
  window.addEventListener("resize", calculateLineHeight);

  // コンテンツの変更を監視（MutationObserver）
  const observer = new MutationObserver(calculateLineHeight);
  if (timelineRef.value) {
    observer.observe(timelineRef.value, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }
});
</script>

<template>
  <div class="relative" ref="timelineRef">
    <YearHeader :year="year" />

    <!-- 年の最初の要素への縦線 -->
    <div
      v-if="items.length > 0"
      class="absolute border-l-3 border-neutral-300 border-dashed"
      :style="{
        left: '91px',
        top: '1.5rem',
        height: '2rem',
      }"
    ></div>

    <!-- 要素間の縦線 -->
    <div
      v-if="items.length > 1"
      class="absolute border-l-3 border-neutral-300 border-dashed"
      :style="{
        left: '91px',
        top: '3.5rem',
        height: lineHeight,
      }"
    ></div>

    <div class="ml-0">
      <div
        v-for="(item, i) in items"
        :key="`${item.category}-${dayjs(item.date).year()}-${i}`"
        class="mb-8 animate-fade-in timeline-item"
        :style="{
          animationDelay: `${i * 100}ms`,
        }"
      >
        <TimelineItem
          :category="item.category"
          :title="item.title"
          :description="item.description"
          :date="item.date"
        />
      </div>
    </div>
  </div>
</template>
