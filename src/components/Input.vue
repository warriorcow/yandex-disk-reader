<template>
  <div class="input">
    <label class="input__wrapper">
      <input
        class="input__field"
        type="text"
        :placeholder="placeholder"
        v-model="model"
      >
    </label>
  </div>
</template>

<script setup lang="ts">
const model = defineModel();

withDefaults(defineProps<{
  placeholder?: string
}>(), {
  placeholder: 'Введите что-то...'
})
</script>

<style scoped lang="scss">
.input {
  height: 100%;

  &__wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__field {
    background-color: #3a3a3a;
    border: none;
    border-radius: 10px;
    padding: 10px;
    height: 100%;
    color: #fff;

    &:focus {
      border: none;
      outline: none;
    }
  }
}

</style>
