<template>
  <div id="app">
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Серёга что-то мутит" active>
          <!-- <test-a-p-i></test-a-p-i> -->
          <b-btn @click="get">Получить массив</b-btn>

          <b-btn @click="getidarr">Получить массив id-ков</b-btn>
          <div>{{ arr[0] }}</div>
        </b-tab>
        <b-tab title="Карта">
          <the-map></the-map>
        </b-tab>
        <b-tab title="Мониторинг вакансий">
          <job-monitor></job-monitor>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import TestAPI from "./components/TestAPI.vue";
import { DataAPI, vacancies } from "./service.js";
import TheMap from "./components/TheMap.vue";
import JobMonitor from "./components/JobMonitor.vue";

export default {
  name: "app",
  components: { TestAPI, TheMap, JobMonitor },
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
