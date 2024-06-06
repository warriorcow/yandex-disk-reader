<template>

</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  window.YaAuthSuggest.init(
    {
      client_id: "ecdd859d914e4f85a1f398b4ee16ca28",
      response_type: "token",
      redirect_uri: "https://oauth.yandex.ru/verification_code"
    },
    "http://localhost:5173/auth",
  )
    .then(({
             handler
           }) => handler())
    .then(data => console.log('Сообщение с токеном', data))
    .catch(error => console.log('Обработка ошибки', error));
})
</script>

<style scoped lang="scss">

</style>
