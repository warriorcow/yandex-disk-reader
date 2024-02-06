<template>
  <div class="file-system">
    <Loader v-if="isLoading" />
    <template v-else>
      <template v-if="responseYaDisk">
        <h1
          class="file-system__title"
          @click="back"
        >
          {{ currentFolder }}
        </h1>
        <div class="file-system__content">
          <FCItem
              v-for="(item, index) in responseYaDisk"
              :key="index"
              :params="item"
              @click="click"
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

const emit = defineEmits(['click', 'back'])

defineProps<{
  isLoading: boolean
  currentFolder: string
  responseYaDisk: Array
}>()

function click(val) {
  emit('click', val)
}

function back() {
  emit('back')
}
</script>

<style scoped lang="scss">
.file-system {
  display: flex;
  flex-direction: column;
  height: 400px;
  gap: 10px;

  &__title {
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: auto;
    padding-right: 10px;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px #494949;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #646464;
    }
  }

  &__empty {
    margin: auto;
  }
}
</style>