<template>
  <div>
      {{ Object.keys(employers).length }}
{{ employers }}
<!-- <b-btn @click="employers">cvcc</b-btn>  -->
  </div>
</template>

<script>
 import axios from 'axios'

  export default {
  name: 'TestAPI',
  
  data() {
    return {
      employers: {}      
    }
  },
  
  created() {
    axios.get(`https://api.hh.ru/vacancies/?text=vue&area=1&per_page=100`)
    .then(response => {
      this.employers = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })

    
  }
}
  
</script>


<style scoped>
</style>