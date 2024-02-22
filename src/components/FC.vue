<template>
  <div class="file-system">
    <Loader v-if="FSStore.isLoadingFS" />
    <template v-else>
      <template v-if="FSStore.FSData">
        <div class="file-system__content">
          <FCItem
              v-for="(item, index) in FSStore.FSData"
              :key="index"
              :params="item"
          ></FCItem>
        </div>
      </template>
      <div class="file-system__empty" v-else>
        No Data :(
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import FCItem from "./FCItem.vue";
import Loader from "./Loader.vue";
import { useFSStore } from "../stores/FS";
const FSStore = useFSStore();
</script>

<style scoped lang="scss">
.file-system {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  background-color: #3a3a3a;
  color: #fff;
  padding: 20px 4px 0 20px;
  border-radius: 10px;
  overflow: hidden;

  &__header {
    padding-bottom: 10px;
    color: #fff;
  }

  &__title {
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
  }

  &__quick-stats {
    font-size: 14px;
    margin-left: auto;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 5px;
    overflow-y: scroll;
    padding-right: 6px;
  }
}
</style>
