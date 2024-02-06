<template>
  <div class="input">
    <label class="input__wrapper">
      <span class="input__title">
        <slot />
      </span>
      <input
        class="input__field"
        type="text"
        v-model="model"
      >
    </label>
  </div>
</template>

<script setup lang="ts">
const model = defineModel();
</script>

<style scoped lang="scss">
.input {
  &__title {
    font-size: 20px;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }


  &__field {
    border: none;
    padding: 10px;
  }
}

</style>