<template>
  <div class="file-system-item">
    <div
      class="file-system-item__name"
      :class="{'is-directory': isDirectory(params.type)}"
      tabindex="0"
      @dblclick.self="dbclick"
    >
      <span class="file-system-item__type">
        <img
          v-if="isDirectory(params.type)"
          src="../assets/folder-icon.svg"
          alt="icon-folder"
        >
        <img
          v-else
          src="../assets/file-question-icon.svg"
          alt="file-question-icon"
        >
      </span>
      {{ params.name }}
      <div class="file-system-item__actions">
        <VButton
          v-if="isDirectory(params.type)"
          :loading="FSStore.isLoadingNestedFiles && FSStore.nestedFilesPath === props.params.path"
          @click="getNestedStats"
        >
          <img
            src="../assets/statistic-board-icon.svg"
            alt="statistic"
          >
        </VButton>
      </div>
    </div>
    <div
      v-if="params.items"
      class="file-system-item__subfolder"
    >
      <FCItem
        v-for="(item, index) in params.items"
        :key="index"
        :params="item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFSStore } from "../stores/FS";
import VButton from "./VButton.vue";

const FSStore = useFSStore();
interface IFCItems {
  name: string
  path: string
  preview: string
  type: string
  media_type: string
  items?: IFCItems[]
}

const props = defineProps<{
  params: IFCItems
}>();

function dbclick() {
  if (isDirectory(props.params.type)) {
    FSStore.getYaDiskData(props.params.path)
  } else {
    window.open(props.params.public_url);
  }
}

function isDirectory(type: string) {
  return type === 'dir'
}

function getNestedStats() {
  FSStore.getNestedStats(props.params.path)
}
</script>

<style scoped lang="scss">
.file-system-item {
  $self: &;

  color: #fff;

  &:hover,
  &:focus-within {
    #{$self}__actions {
      opacity: 1;
    }
  }

  &__name {
    display: flex;
    align-items: center;
    padding: 10px;
    gap: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 50ms;

    &.is-directory {
      font-weight: 700;
    }

    &:hover {
      background-color: #606060;
    }

    &:focus-within {
      background-color: #808080;
    }
  }

  &__button {
    padding: 3px 10px;
    font-size: 12px;
    font-weight: 400;
  }

  &__type {
    display: flex;
    align-items: center;
    width: 30px;
  }

  &__media-type {
    font-size: 12px;
    color: teal;
    margin-left: auto;
    font-weight: 700;
  }

  &__preview {
    display: inline-flex;
    width: 25px;
    height: 25px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__subfolder {
    position: relative;
    padding-left: 40px;

  }

  &__actions {
    opacity: 0;
    margin-left: auto;
  }
}
</style>
