<template>
  <div id="app">
<test-a-p-i></test-a-p-i>

  </div>
</template>

<script>

import TestAPI from './components/TestAPI.vue'

export default {
  
  name: 'app',
  components: { TestAPI },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
</style>
