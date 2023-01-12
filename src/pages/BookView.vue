<template>
  <q-page class="row">
    <div class="col-12 text-center">
      <h3 v-if="quasar.platform.is.desktop" style="margin-bottom: 0px;">{{ storeBook.name }}</h3>
      <h5 v-else style="padding:0; margin: 20px 0 20px 0">{{ storeBook.name }}</h5>
    </div>
    <div class="col-12 q-mb-sm text-center" v-if="storeBook.numberOfChapters && (quasar.platform.is.desktop)">
      <q-btn class="q-mr-xs q-mt-xs" square :color="n === numberOfChapter ? 'white' : 'primary'" :class="n === numberOfChapter ? 'text-black' : ''"
       v-for="n in storeBook.numberOfChapters" :key="n" @click="reloadChapterVerses(n)">
        {{ n }}
      </q-btn>
    </div>
    <div class="col-12 text-center q-px-md" v-if="storeBook.numberOfChapters && (!quasar.platform.is.desktop)">
      <q-select dense outlined :bg-color="!quasar.dark.isActive ? 'green-1': 'dark'" v-model="optionSelected" :options="arrayNumberOfChapter"
      label="Selecione o Capítulo" @update:model-value="val => reloadChapterVerses(val)" />
    </div>
    <div class="col-12" v-if="chapterVerses.length > 0">
      <!--<ChapterDetails v-for="verse in chapterVerses" :verse="verse" :key="verse" />-->
      <TableVerses :verses="chapterVerses" />
    </div>

  </q-page>
</template>

<script>
// import ChapterDetails from 'components/ChapterDetails.vue'
import TableVerses from 'components/TableVerses.vue'
import { defineComponent, ref, onMounted, computed, watch } from 'vue'
import { useQuasar, QSpinnerFacebook } from 'quasar'
import { useRoute } from 'vue-router'
import { useBookStore } from 'stores/book'
import useApi from 'src/composables/requests/UseApi'

export default defineComponent({
  name: 'BookView',
  components: { TableVerses },
  setup () {
    const quasar = useQuasar()
    const route = useRoute()
    const storeBook = useBookStore()
    const { getBookChapterVerses } = useApi()
    const optionSelected = ref(1)
    const numberOfChapter = ref(1)
    const chapterVerses = ref([])

    const getChapterVerses = async () => {
      showLoading()
      chapterVerses.value = [] // Para zerar a tabela quando mudarmos o livro ou capítulo
      try {
        const { data } = await getBookChapterVerses(route.params.book, numberOfChapter.value)
        chapterVerses.value = data.verses
      } catch (error) {
        console.log(error)
      } finally {
        quasar.loading.hide()
      }
    }

    const reloadChapterVerses = async (chapter) => {
      if (numberOfChapter.value === chapter) { return }
      numberOfChapter.value = chapter
      getChapterVerses()
    }

    const arrayNumberOfChapter = computed(() => {
      const arrayNumbers = []
      for (let i = 1; i <= storeBook.numberOfChapters; i++) {
        arrayNumbers.push(i)
      }
      return arrayNumbers
    })

    const showLoading = () => {
      quasar.loading.show({
        spinner: QSpinnerFacebook,
        message: 'Seus dados estão sendo carregador. Um momento, por favor...',
        spinnerColor: 'white',
        spinnerSize: 140,
        backgroundColor: 'primary',
        messageColor: 'white'

      })
    }

    watch(() => route.params.book, (newValue) => {
      if (route.name === 'book') {
        numberOfChapter.value = 1
        getChapterVerses()
      }
    })

    onMounted(() => {
      getChapterVerses()
    })

    return {
      storeBook,
      chapterVerses,
      numberOfChapter,
      optionSelected,
      arrayNumberOfChapter,
      reloadChapterVerses,
      quasar
    }
  }
})
</script>
