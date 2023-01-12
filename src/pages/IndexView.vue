<template>
  <q-page class="flex flex-center">
    <img v-if="quasar.platform.is.desktop" alt="Biblia Digital"
    :src="image"
    style="width: 500px; height: 500px; border-radius: 50%"
    >
    <img v-else alt="Biblia Digital"
    :src="image"
    style="width: 350px; height: 350px; border-radius: 50%"
    >
  </q-page>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'IndexView',
  setup () {
    const quasar = useQuasar()
    const image = computed(() => {
      return quasar.dark.isActive ? 'images/biblia-digital-dark.png' : 'images/biblia-digital.png'
    })
    return {
      image,
      quasar
    }
  }
})
</script>
