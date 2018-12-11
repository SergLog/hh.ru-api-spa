<template>
  <div id="app">
    <!-- <test-a-p-i></test-a-p-i> -->
    <b-btn @click="get"></b-btn>
  </div>
</template>

<script>
import TestAPI from "./components/TestAPI.vue";
import { DataAPI, vacancies } from "./service.js";

export default {
  name: "app",
  components: { TestAPI },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      arr: []
    };
  },
  methods: {
    get: function() {
      new DataAPI().getData(getvac.bind(this));
      function getvac(d) {
        //console.log(this.msg);
        console.log(this.arr);
        this.arr = d;
        console.log(this.arr);
      }
    }
  }
};
</script>

<style>
</style>
