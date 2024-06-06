<template>
  <code class="code">
    <VButton
      class="code__copy"
      @click="copyToClipboard"
    >
      <img src="../assets/clipboard-icon.svg" alt="clipboard">
    </VButton>
    <span
      ref="textCode"
      class="code__text"
    >
      <slot />
    </span>
  </code>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { useToastStore } from "../stores/Toast";
import VButton from "./VButton.vue";

const textCode: Ref<HTMLElement> = ref(null)
const ToastStore = useToastStore();
function copyToClipboard() {
  navigator.clipboard.writeText(textCode.value.innerText);
  ToastStore.addToast({
    text: 'Скопировано в буфер обмена',
    status: 'success'
  })
}
</script>

<style scoped lang="scss">
  .code {
    display: flex;
    background-color: #252525;
    color: #fff;
    padding: 10px 40px 10px 10px;
    width: 100%;
    max-height: 200px;
    overflow: auto;
    border-radius: 10px;
    position: relative;

    &__copy {
      width: 30px;
      height: 30px;
      cursor: pointer;
      position: absolute;
      top: 5px;
      right: 5px;
    }
  }
</style>
