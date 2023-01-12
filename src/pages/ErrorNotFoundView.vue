<template>
  <div class='fixed-center text-center'>
    <h3 class="text-grey-5">404 - PAGE NOT FOUND</h3>
    <p>
      <img src='~assets/sad.svg' style='width:30vw;max-width:150px;'>
    </p>
    <h5 class="text-grey-5">
      Desculpe, a página não foi encontrada...
    </h5>
    <q-btn color='primary q-py-sm' style='width:300px;' to='/' label='Home' />
  </div>
</template>

<script >
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorNotFoundView'
})
</script>
