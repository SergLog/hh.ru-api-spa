<template>
  <div id="app">
    <!-- <test-a-p-i></test-a-p-i> -->
    <b-btn @click="get">Получить массив</b-btn>
    
    <b-btn @click="getidarr">Получить массив id-ков</b-btn>
    <div>{{ arr[0] }}</div>
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
      //new DataAPI().getData(this.fillarray);

      var ob = new DataAPI();

      ob.getData(getData);
      //console.log(ob.PagesCount);

          function getData(Data) {
                console.log(Data);
          }

      //console.log(ob.PagesCnt);
      ob.getAllData();
    },
    getidarr: function() {
      new DataAPI().getIDArray();
    },
    fillarray: function(arr) {
      this.arr = arr;
      //console.log(arr);
    }
  }
};
</script>

<style>
</style>
