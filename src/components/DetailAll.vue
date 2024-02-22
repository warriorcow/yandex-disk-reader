<template>
  <div class="detail">
    <Loader v-if="FSStore.isLoadingNestedFiles" />
    <template v-else>
      <template v-if="hasNestedData">
        <div class="detail__content">
          <div class="detail__full-statistic">
            <div class="detail__folder-name">
              В папке <b>{{ FSStore.getNestedFolderName }}</b> и её вложенных папках лежат:
            </div>
            <div class="detail__items">
              <div
                v-for="(item, key) in FSStore.getTypeFilesNestedFolders"
                :key="key"
                class="detail__item"
              >
                {{ key }}: <b>{{ item }}</b>
              </div>
            </div>
          </div>
          <div class="detail__folder-statistic">
            <div
              v-for="(item, key) in FSStore.getFilteredNestedData"
              :key="key"
              class="detail__folder-group"
            >
              <h3 class="detail__folder-name">{{ key }}</h3>
              <div class="detail__items">
                <div
                  v-for="(value, key) in item"
                  :key="key"
                  class="detail__item"
                >
                  <div class="detail__type-count">
                    {{ key }}: <b>{{value.length}}</b>
                  </div>
                  <VCode>
                    {{ getUniqueResolutions(value) }}
                  </VCode>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="detail__empty">
          No Data :(
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useFSStore } from "../stores/FS";
import { getUniqueResolutions } from "../helpers";
import Loader from "./Loader.vue";
import VCode from "./VCode.vue";
import {computed} from "vue";
const FSStore = useFSStore();

const hasNestedData = computed(() => {
  return Object.keys(FSStore.getFilteredNestedData).length
})
</script>

<style scoped lang="scss">
.detail {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  background-color: #3a3a3a;
  padding: 20px 4px 0 20px;
  border-radius: 10px;
  overflow: hidden;
  color: #fff;

  &__content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__folder-name {
    font-weight: 700;
    font-size: 20px;
  }

  &__full-statistic {
    padding: 20px;
    background-color: #606060;
    border-radius: 10px;
    margin-right: 20px;
    margin-bottom: 20px;
  }

  &__folder-statistic {
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: scroll;
    padding-right: 6px;
  }

  &__folder-group {
    padding-bottom: 20px;

    &:not(:last-child) {
      border-bottom: 2px solid #fff;
    }
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
  }

  &__item {
    display: flex;
    gap: 10px;
  }

  &__type-count {
    min-width: 70px;
  }
}
</style>
