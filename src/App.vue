<template>
  <div class="app">
    <Navigation class="app__navigation" />
    <FC class="app__file-system" />
    <DetailAll class="app__detail" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import Navigation from './components/Navigation.vue';
import FC from './components/FC.vue';
import { useFSStore } from './stores/FS';
import DetailAll from './components/DetailAll.vue';

const FSStore = useFSStore();

onMounted(async () => {
  FSStore.setSavedToken();
})
</script>

<style scoped lang="scss">
.app {
  display: grid;
  grid-template-areas:
        "nav nav"
        "fc detail";
  grid-auto-columns: 1fr;
  grid-template-rows: max-content;
  gap: 20px;
  height: 100vh;
  padding: 10px;
  background-color: #2a2a2a;

  &__file-system {
    grid-area: fc;
  }

  &__navigation {
    grid-area: nav;
  }

  &__detail {
    grid-area: detail;
  }
}
</style>
