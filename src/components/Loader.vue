<template>
  <div class="loader">
    <div class="lds-dual-ring"></div>
  </div>
</template>

<style scoped lang="scss">
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  flex: 1;
  padding: 20px;
}

.lds-dual-ring {
  position: relative;
  display: inline-block;
  aspect-ratio: 1 / 1;
  width: 100%;
}

.lds-dual-ring:after {
  content: " ";
  display: block;
  position: absolute;
  width: 50%;
  height: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 10px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

</style>
<script setup lang="ts">
</script>
