<template>
  <div class="">
    <div class="text-center">
      <p class="text-h6">Versículo {{props.verse.number}}</p>
      <p>{{props.verse.text}}</p>
      <hr />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChapterDetails',
  props: {
    verse: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    return {
      props
    }
  }
})
</script>
