<template>
  <div id="app">
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Серёга что-то мутит" active>
          <!-- <test-a-p-i></test-a-p-i> -->
          <!-- <b-btn @click="get">Получить массив</b-btn> -->
          <b-btn @click="getDataTest">Проверка</b-btn>

          <!-- <b-btn @click="getidarr">Получить массив id-ков</b-btn> -->
          <!-- <div>{{ arr[0] }}</div> -->
          <div>{{ result.length }}</div>
        </b-tab>
        <b-tab title="Карта">
          <the-map :locationObject="mapObjects"></the-map>
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

import axios from "axios";

import JobMonitor from "./components/JobMonitor.vue";

export default {
  name: "app",
  components: { TestAPI, TheMap, JobMonitor },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      arr: [],
      vacans: [],
      vacansid: [],
      result: [],
      mapObjects: [{ lat: 37, lng: 61 }, { lat: 37, lng: 55 }]
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
    },
    getDataTest() {
      let pagesCount;
      let i = 0;

      axios
        .get(`https://api.hh.ru/vacancies/?text=vue+&area=1&per_page=100`)
        .then(response => {
          pagesCount = response.data.pages;
          runLoop.call(this, pagesCount);
        })
        .catch(e => {
          console.log(e);
        });

      function runLoop(cnt) {
        while (i < cnt) {
          axios
            .get(
              `https://api.hh.ru/vacancies/?text=vue+&area=1&per_page=100&page=${i}`
            )
            .then(response => {
              response.data.items.forEach((element, i) => {
                this.vacans.push(response.data.items[i]);
                this.vacansid.push(element["id"]);

                setTimeout(
                  function() {
                    console.log(i);

                    axios
                      .get(`https://api.hh.ru/vacancies/${element["id"]}`)
                      .then(response => {
                        this.result.push(response.data);
                      })
                      .catch(e => {
                        //this.errors.push(e)
                        console.log(e);
                      });
                  }.bind(this),
                  i * 1000
                );

                //}).bind(this);
              });
            })
            .catch(e => {
              console.log(e);
            });
          i++;
        }
      }
    }
  }
};
</script>

<style>
</style>
