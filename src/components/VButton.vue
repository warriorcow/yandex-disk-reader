<template>
  <button
    class="button"
    :class="transparent ? 'button--transparent' : ''"
    type="button"
  >
    <span
      class="button__content"
      :class="loading ? 'button__content--hidden' : ''"
    >
      <span
        v-if="text"
        class="button__text"
        v-html="text"
      />
      <span class="button__slot">
        <slot></slot>
      </span>
    </span>

    <Loader
      v-if="loading"
      class="button__loader"
    />
  </button>
</template>

<script setup lang="ts">
  import Loader from "./Loader.vue";

  withDefaults(defineProps<{
    loading?: boolean
    transparent?: boolean
    text?: string
  }>(), {
    loading: false
  })
</script>

<style scoped lang="scss">
  .button {
    $self: &;

    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 5px;
    background-color: #383838;
    padding: 5px;
    transition: 100ms;

    &__content {
      &--hidden {
        opacity: 0;
      }
    }

    &__loader {
      position: absolute;
    }

    &:hover {
      background-color: #1a1a1a;
    }

    &--transparent {
      background-color: transparent;
    }

    &__text {
      display: block;
      color: #FFF;
      font-size: 14px;
    }

    &__slot {
      display: flex;
      max-height: 25px;
      max-width: 25px;
    }
  }
</style>
