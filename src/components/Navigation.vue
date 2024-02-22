<template>
  <div class="navigation">
    <VButton
      class="navigation__back"
      transparent
      @click="FSStore.goBack"
    >
      <img src="../assets/arrow.svg" alt="">
    </VButton>
    <div class="navigation__field">
      <div
        v-for="(item, index) in FSStore.getNavigationPath"
        :key="index"
        class="navigation__item"
      >
        <div
          v-if="index !== FSStore.getNavigationPath.length"
          class="navigation__separator"
        >
          /
        </div>
        <div
          class="navigation__name"
          @click="goToPath(index)"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <Input
      :placeholder="FSStore.token"
      v-model="newToken"
      @keydown.enter="FSStore.setNewToken(newToken)"
    />
  </div>
</template>

<script setup lang="ts">
import { useFSStore } from "../stores/FS.js";
import VButton from "./VButton.vue";
import Input from "./Input.vue";
import { ref } from "vue";

const FSStore = useFSStore();

const newToken = ref('')

function goToPath(index: number) {
  const path = FSStore.currentPath.split('/').slice(0, ++index ).join('/');
  FSStore.getYaDiskData(path)
}
</script>

<style scoped lang="scss">
.navigation {
  display: flex;
  gap: 10px;
  font-size: 12px;

  &__back {
    aspect-ratio: 1 / 1;
    width: 40px;
  }

  &__field {
    display: flex;
    flex-grow: 1;
    padding: 10px;
    border-radius: 10px;
    background-color: #3a3a3a;
    color: #fff;
  }

  &__item {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
  }

  &__name {
    cursor: pointer;
    position: relative;
    z-index: 2;
    padding: 5px 10px;
    line-height: 1;
    white-space: nowrap;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: #606060;
      z-index: -1;
      opacity: 0;
      border-radius: 5px;
      transition: opacity 100ms;
    }

    &:hover {
      &:before {
        opacity: 1;
      }
    }
  }

  &__separator {
    user-select: none;
    margin: 0 6px;
  }
}
</style>
