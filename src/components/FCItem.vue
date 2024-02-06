<template>
  <div @click="click" class="file-system__item">
    <div
      class="file-system__name"
      :class="{'is-directory': isDirectory(params.type)}"
    >
      <span
        v-if="isDirectory(params.type)"
        class="file-system__type"
      >
        /
      </span>
      <span
        v-if="params.preview"
        class="file-system__preview"
      >
        <img
          :src="params.preview"
          :alt="params.name"
        >
      </span>
      {{ params.name }}
      <span class="file-system__media-type">
        {{ params.media_type }}
      </span>
    </div>
    <div
      v-if="params.items"
      class="file-system__subfolder"
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

interface IFCItems {
  name: string
  path: string
  preview: string
  type: string
  media_type: string
  items?: IFCItems[]
}

const emit = defineEmits(['click'])

const props = defineProps<{
  params: IFCItems
}>();

function click() {
  if (isDirectory(props.params.type)) {
    emit('click', props.params.path)
  }
}

function isDirectory(type: string) {
  return type === 'dir'
}
</script>

<style scoped lang="scss">
.file-system {
  margin-bottom: 100px;

  &__item {
    display: flex;
    gap: 5px;
    flex-direction: column;
  }

  &__name {
    display: flex;
    align-items: center;
    padding: 10px;
    gap: 10px;

    &.is-directory {
      background-color: #333;
      font-weight: 700;
      cursor: pointer;
    }
  }

  &__type {
    color: teal;
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
}
</style>