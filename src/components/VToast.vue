<template>
  <div
    v-if="ToastStore.items"
    class="toast"
  >
    <div
      class="toast__item"
      :class="item.status ? `toast__item--${item.status}` : ''"
      v-for="(item, index) in ToastStore.items"
      :key="index"
    >
      <div
        v-if="item.title"
        class="toast__title"
      >
        {{ item.title }}
      </div>
      <div class="toast__text">
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from "../stores/Toast";

const ToastStore = useToastStore();
</script>

<style scoped lang="scss">
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;

  &__item {
    padding: 10px 20px;
    border-radius: 10px;
    background-color: #545454;
    color: #fff;
    animation-name: animation;
    animation-duration: 4s; /* Длительность анимации */
    animation-iteration-count: 1; /* Анимация повторится один раз */
    animation-fill-mode: forwards;
    transform: translateX(200%);
    transition: 100ms;

    &--danger {
      background-color: #7b0000;
    }

    &--success {
      background-color: #477f03;
    }
  }

  &__title {
    font-size: 20px;
    font-weight: 700;
    border-bottom: 1px solid;
    padding-bottom: 2px;
    margin-bottom: 4px;
  }

  &__text {
    font-size: 14px;
  }

  @keyframes animation {
    0% {
      transform: translateX(200%);
    }

    20% {
      transform: translateX(0);
    }

    80% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(200%);
    }
  }
}
</style>
