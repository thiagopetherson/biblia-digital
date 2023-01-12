import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'

export const useBookStore = defineStore({
  id: 'book',
  state: () => ({
    numberOfChapters: LocalStorage.getItem('numberOfChapters') ? LocalStorage.getItem('numberOfChapters') : 1,
    name: LocalStorage.getItem('nameBook') ? LocalStorage.getItem('nameBook') : ''
  }),
  actions: {
    setChapters (chapters) {
      LocalStorage.set('numberOfChapters', chapters)
      this.numberOfChapters = chapters
    },
    setName (name) {
      LocalStorage.set('nameBook', name)
      this.name = name
    }
  }
})
