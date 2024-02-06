<template>
  <div class="settings">
    <form class="settings__form">
      <h1>Настройки</h1>
      <Input v-model="token">
        OAuth-токен
      </Input>
      <Input v-model="folder">
        Искать в папке
      </Input>
      <button
          class="settings__submit"
          @click.prevent="submit">
        Получить данные
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import Input from "./Input.vue";

const emit = defineEmits(['submit']);

const token = defineModel('token');
const folder = defineModel('folder');

function submit() {
  emit('submit')
}
</script>

<style scoped lang="scss">
.settings {
  display: flex;
  min-height: 400px;

  &__form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
  }

  &__submit {
    display: inline-block;
    margin-top: auto;
  }
}
</style>