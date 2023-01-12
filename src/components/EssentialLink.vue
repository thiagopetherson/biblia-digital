<template>
  <q-item
    clickable
    :to="{ name: 'book', params: { book: abbrev } }"
    exact
    @click="setNumberOfChapters"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'
import { useBookStore } from 'stores/book'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    icon: {
      type: String,
      default: ''
    },

    abbrev: {
      type: String,
      default: ''
    },

    chapters: {
      type: Number,
      default: 0
    }
  },
  setup (props) {
    const storeBook = useBookStore()

    const setNumberOfChapters = () => {
      storeBook.setChapters(props.chapters)
      storeBook.setName(props.title)
    }

    return {
      props,
      setNumberOfChapters
    }
  }
})
</script>
