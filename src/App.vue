<template>
  <div class="app">
    <Navigation class="app__navigation" />
    <splitpanes class="app__panel" @resized="resized">
      <pane :size="sizePanel.sizeFC" min-size="20">
        <FC class="app__file-system" />
      </pane>
      <pane>
        <DetailAll class="app__detail" />
      </pane>
    </splitpanes>
  </div>
  <VToast></VToast>
</template>

<script setup lang="ts">
import {computed, onMounted} from 'vue';
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import Navigation from './components/Navigation.vue';
import FC from './components/FC.vue';
import { useFSStore } from './stores/FS';
import DetailAll from './components/DetailAll.vue';
import VToast from "./components/VToast.vue";

const FSStore = useFSStore();

const sizePanel = computed(() => {
  return {
    sizeFC: localStorage.getItem('panelSizeFC'),
    sizeDetail: localStorage.getItem('panelSizeDetail'),
  }
})

onMounted(async () => {
  FSStore.setSavedToken();
})

function resized(e) {
  localStorage.setItem('panelSizeFC', e[0].size);
}
</script>

<style scoped lang="scss">
:deep(.splitpanes) {
  display: flex;
  width: 100%;
  height: 100%;

  .splitpanes__splitter {
    position: relative;
    min-width: 10px;
    cursor: ew-resize;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: #fff;
      transition: background-color .3s;
      height: 20px;
      width: 1px;
    }

    &::after {
      left: 3px;
    }

    &::before {
      left: 6px;
    }
  }
}
.app {
  display: grid;
  grid-template-areas:
        "nav nav"
        "panel panel";
  grid-auto-columns: 1fr;
  grid-template-rows: max-content;
  gap: 20px;
  height: 100vh;
  padding: 10px;
  background-color: #2a2a2a;

  &__panel {
    grid-area: panel;
    overflow: hidden;
  }

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
