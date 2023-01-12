<template>
  <div class="q-pa-md">
    <h6 class="text-center" style="padding:0; margin: 0 0 5px 0" v-if="!quasar.platform.is.desktop">Versículos</h6>
    <q-table
      grid
      :card-container-class="cardContainerClass"
      :title="quasar.platform.is.desktop ? 'Versículos' : ''"
      :rows="props.verses"
      :columns="columns"
      row-key="text"
      :filter="filter"
      hide-header
      v-model:pagination="pagination"
      :rows-per-page-options="rowsPerPageOptions"
    >
      <template v-slot:top-right>
        <q-input outlined dense debounce="300" v-model="filter" placeholder="Procurar Versículo">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card>
            <q-card-section class="text-center" :class="!quasar.platform.is.desktop ? 'q-py-none' : 'q-py-sm'"
            :style="{ backgroundColor: '#20B2AA' }">
              <strong class="text-bold text-white">{{ props.row.number }}</strong>
            </q-card-section>
            <q-separator />
            <q-card-section class="flex flex-center">
              <div class="text-bolder" :class="!quasar.platform.is.desktop ? 'text-body2' : 'text-body2'">
                {{ props.row.text }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'
import { useQuasar } from 'quasar'

const columns = [
  { name: 'number', align: 'center', label: '', field: 'number', sortable: true },
  { name: 'text', align: 'center', label: '', field: 'text', sortable: true }
]

export default defineComponent({
  name: 'TableVerses',
  props: {
    verses: {
      type: Array,
      required: true
    }
  },
  setup (props) {
    const quasar = useQuasar()

    function getItemsPerPage () {
      if (quasar.screen.lt.sm) {
        return 15 // 3
      }
      if (quasar.screen.lt.md) {
        return 15 // 6
      }
      return 9 // 9
    }

    const filter = ref('')
    const pagination = ref({
      page: 1,
      rowsPerPage: getItemsPerPage()
    })

    const cardContainerClass = computed(() => {
      return quasar.screen.gt.xs
        ? 'grid-masonry grid-masonry--' + (quasar.screen.gt.sm ? '3' : '2')
        : null
    })

    const rowsPerPageOptions = computed(() => {
      return quasar.screen.gt.xs
        ? quasar.screen.gt.sm ? [3, 6, 9] : [3, 6]
        : [3]
    })

    watch(() => quasar.screen.name, () => {
      pagination.value.rowsPerPage = getItemsPerPage()
    })

    return {
      filter,
      pagination,
      cardContainerClass,
      rowsPerPageOptions,
      columns,
      props,
      quasar
    }
  }
})
</script>
