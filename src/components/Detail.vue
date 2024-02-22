<template>
  <Loader v-if="FSStore.isLoadingFS" />
  <div v-else class="detail">
    <template v-if="FSStore.FSData.length">
      <div class="detail__title">
        Сводка текущей директории: {{ FSStore.getFolderName }}
        <hr>
      </div>
      <div class="detail__wrapper">
        <div class="detail__current">
          <div v-if="FSStore.getCountDirCurrentFolder">
            Директории: {{ FSStore.getCountDirCurrentFolder }}
          </div>
          <div v-if="FSStore.getCountFilesCurrentFolder">
            Файлов: {{ FSStore.getCountFilesCurrentFolder }}
          </div>
        </div>
        <div class="detail__current">
          <div
            v-for="(item, key) in FSStore.getFilteredCurrentFolder"
            :key="key"
          >
              <b>{{ key }} - {{item.length}}</b>
              <VCode>
                {{ getUniqueResolutions(item) }}
              </VCode>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="detail__empty">
        No Data :(
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useFSStore } from "../stores/FS";
import Loader from "./Loader.vue";
import {getUniqueResolutions} from "../helpers";
import VCode from "./VCode.vue";
const FSStore = useFSStore();

async function copyClipboard(text) {
  await navigator.clipboard.writeText(text);
  alert('Скопировано!')
}
</script>

<style scoped lang="scss">
.detail {
  flex: 1;

  &__wrapper {
    display: flex;
    gap: 20px;
  }

  &__current {
    flex: 1;

    &:first-child {
      max-width: 240px;
    }
  }

  &__title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
  }
}
</style>
