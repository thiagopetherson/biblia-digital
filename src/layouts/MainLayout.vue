<template>
  <q-layout :view="!quasar.platform.is.desktop ? 'Lhh Lpr lFr' : 'lHr Lpr lFr'">
    <q-header elevated>
      <q-toolbar :class="quasar.dark.isActive ? `bg-dark` : `bg-primary`">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Bíblia Digital
        </q-toolbar-title>

        <div>
          <DarkModeToggle />
          <router-link to="/">
            <q-btn
              icon="home"
            >
              Home
            </q-btn>
          </router-link>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          <span class="text-weight-bolder text-h6">Livros</span>
          <q-input class="q-mt-sm" outlined dense v-model="filterBook" placeholder="Procurar Livro" @keyup="searchBooks">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition appear enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import EssentialLink from 'components/EssentialLink.vue'
import DarkModeToggle from 'components/DarkModeToggle.vue'
import useApi from 'src/composables/requests/UseApi'

export default defineComponent({
  name: 'MainLayout',
  components: {
    EssentialLink,
    DarkModeToggle
  },

  setup () {
    const quasar = useQuasar()
    const leftDrawerOpen = ref(false)
    const originalLinksList = ref([])
    const linksList = ref([])
    const filterBook = ref('')
    const { getBooks } = useApi()

    const listBooks = async () => {
      try {
        const data = await getBooks()
        linksList.value = []
        data.forEach(item => {
          linksList.value.push({
            title: item.name,
            caption: `Capítulos: ${item.chapters}`,
            icon: 'menu_book',
            abbrev: item.abbrev.en,
            chapters: item.chapters
          })
        })
        originalLinksList.value = linksList.value
      } catch (error) {
        console.log(error)
      }
    }

    const searchBooks = () => {
      if (filterBook.value.trim() === '') {
        linksList.value = originalLinksList.value
        return
      }

      const obj = originalLinksList.value.filter(item => {
        // const arr = item.title.trim().toLowerCase().split(' ')

        return removeAccents(item.title.trim().toLowerCase()).includes(removeAccents(filterBook.value.trim().toLowerCase()))

        // return arr.includes(filterBook.value.trim().toLowerCase()) ||
        // removeAccents(item.title.trim().toLowerCase()).includes(removeAccents(filterBook.value.trim().toLowerCase()))
      })
      linksList.value = obj
    }

    const removeAccents = (word) => {
      return word.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    }

    onMounted(() => {
      listBooks()
    })

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      filterBook,
      searchBooks,
      quasar
    }
  }
})
</script>

<style scoped>
.router-link-active, .router-link-exact-active {
  text-decoration: none;
  color: #fff;
}
</style>
