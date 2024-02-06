<template>
  <div class="main-page">
    <Container>
      <Settings
        v-model:token="token"
        v-model:folder="folder"
        @submit="fetchData"
      />
    </Container>
    <Container>
      <FC
        :current-folder="currentFolder"
        :is-loading="isLoading"
        :response-ya-disk="responseYaDisk"
        @click="fetchData"
        @back="goBack"
      />
    </Container>
    <Container>
      <h1>Фильтры</h1>
      <Input v-model="priceForPicture">
        Цена за картинку:
      </Input>
    </Container>
    <Container v-if="responseYaDisk">
      <h1>Расчеты</h1>
      <div class="results">
        <div class="results__item">
          Размеры Video:
          <code class="code">
            {{ sizeFilesVideo }}
          </code>

          Размеры Images:
          <code class="code">
            {{ sizeFilesImages }}
          </code>
        </div>
        <div class="results__item">
          Типы файлов:
          <table class="table">
            <tbody>
            <tr v-for="(item, index) in typeFiles">
              <td>{{index}}</td>
              <td>{{item}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";

import Settings from "./components/Settings.vue";
import Container from "./components/Container.vue";
import FC from "./components/FC.vue";
import Input from "./components/Input.vue";

const token = ref('y0_AgAEA7qj_FF6AADLWwAAAAD6IT3xAAAU7vta6dFKspNnyPfd23B6Vji-hQ') // y0_AgAEA7qj_FF6AADLWwAAAAD6IT3xAAAU7vta6dFKspNnyPfd23B6Vji-hQ-hQ
const folder = ref('disk:/CreativeZone/Megafon/2024/Январь/МегаСкидки 50%/DOOH/Мегаскидки до 50%')
const currentFolder = ref('/')
const responseYaDisk = ref()
const isLoading = ref(false)
const priceForPicture = ref(200)

const sizeFilesVideo = computed(() => {
  const arrVideo = responseYaDisk.value.filter(itemI => isVideo(itemI.media_type)).map(item => {
    return item.name.split('_')[0]
  })

  console.log(arrVideo)

  const uniqSet = new Set(arrVideo);
  return [...uniqSet].join(' ');
})

const sizeFilesImages = computed(() => {
  const arrImage = responseYaDisk.value.filter(itemI => isImage(itemI.media_type)).map(item => {
    return item.name.split('_')[0]
  })

  const uniqSet = new Set(arrImage);
  return [...uniqSet].join(' ');
})

const typeFiles = computed(() => {
  const result = responseYaDisk.value.map(item => {
    return item.media_type
  }).reduce((acc, i) => {
    if (acc.hasOwnProperty(i)) {
      acc[i] += 1;
    } else {
      acc[i] = 1;
    }
    return acc;
  },{})

  return result
})

onMounted(() => {
  currentFolder.value = folder.value
})

function isImage(media_type: string) {
  return media_type === 'image'
}

function isVideo(media_type: string) {
  return media_type === 'video'
}

function goBack() {
  console.log(currentFolder.value)
}

async function fetchData(path: string) {
  isLoading.value = true
  responseYaDisk.value = await getYaDiskData(path ? path : folder.value)
  isLoading.value = false
}

async function getYaDiskData(folderParam: string): Promise<void> {
  const params = new URLSearchParams({
    limit: '2000',
    path: folderParam || '/'
  })

  const response = await fetch(`https://cloud-api.yandex.net/v1/disk/resources?${params}`, {
    headers: {
      'Authorization' : `OAuth ${token.value}`
    },
  })

  const { _embedded } = await response.json()
  currentFolder.value = folderParam
  folder.value = folderParam
  return _embedded?.items
}

</script>

<style scoped lang="scss">
.main-page {
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  grid-gap: 20px;
  align-items: start;
}

.table {
  font-size: 12px;
  text-align: center;
  border-collapse: collapse;

  td {
    padding: 3px 5px;
    border: 1px solid;
  }
}

.results {
  display: flex;
  gap: 20px;

  &__item {

  }
}

.code {
  display: flex;
}
</style>
