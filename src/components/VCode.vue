<template>
  <code class="code">
    <slot></slot>
  </code>
</template>

<script setup>

</script>

<style scoped lang="scss">
  .code {
    display: flex;
    background-color: #252525;
    color: #fff;
    padding: 10px;
    width: 100%;
    max-height: 200px;
    overflow: auto;
    border-radius: 10px;
  }
</style>
