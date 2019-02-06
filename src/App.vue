<template>
  <div id="app">
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Серёга что-то мутит" active>
          <br>
          <b-input
            id="keyWords"
            style="width: 300px"
            placeholder="Введите ключевые слова (vue+html)"
            size="sm"
            required
          ></b-input>
          <br>
          <b-progress :value="counter" :max="vacansCnt" show-progress animated class="w-25 mb-2"></b-progress>
          <br>
          <b-btn @click="getData">Загрузить</b-btn>
          <br>
          <br>
          <div>Количество вакансий - {{ result.length }} из {{ vacansCnt }}</div>
          <div>Количество объектов на карте - {{ addressArr.length }}</div>
          <br>
          <div>{{ addressArr }}</div>
        </b-tab>
        <b-tab title="Навыки">
          <the-skills v-bind:arr="result"></the-skills>
        </b-tab>
        <b-tab title="Карта">
          <the-map :locationObject="addressArr"></the-map>
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
import TheSkills from "./components/TheSkills.vue";

import axios from "axios";

import JobMonitor from "./components/JobMonitor.vue";

export default {
  name: "app",
  components: { TestAPI, TheMap, JobMonitor, TheSkills },
  data() {
    return {
      vacans: [],
      vacansid: [],
      result: [],
      counter: 0,
      vacansCnt: 0,
      addressArr: []
    };
  },
  methods: {
    getskills() {
      var arr = [1, -1, 2, -2, 3];

      var positiveArr = arr.filter(function(number) {
        return number > 0;
      });

      alert(positiveArr); // 1,2,3
    },
    getData() {
      //todo сделать fetch, fetchall, async await

      let pagesCount;
      let i = 0;

      this.result = [];
      this.vacansCnt = 1;

      let keywords = document.getElementById("keyWords");
      if (keywords.value.length === 0) {
        alert("Введите ключевые слова");
      }

      axios
        .get(
          `https://api.hh.ru/vacancies/?text=${
            keywords.value
          }+&per_page=100`
        )
        .then(response => {
          pagesCount = response.data.pages;
          this.vacansCnt = response.data.found;
          runLoop.call(this, pagesCount);
        })
        .catch(e => {
          console.log(e);
        });

      function runLoop(cnt) {
        while (i < cnt) {
          this.counter = i;

          

          axios
            .get(
              `https://api.hh.ru/vacancies/?text=${
                keywords.value
              }+&per_page=100&page=${i}`
            )
            .then(response => {
              response.data.items.forEach((element, i) => {
                this.vacans.push(response.data.items[i]);
                this.vacansid.push(element["id"]);

                if (
                  response.data.items[i].address !== null &&
                  response.data.items[i].address.hasOwnProperty("lat") &&
                  response.data.items[i].address.hasOwnProperty("lng")
                ) {
                  //console.log(response.data.items[i].id);
                  var p = new Object();
                  p.lat = response.data.items[i].address.lat;
                  p.lng = response.data.items[i].address.lng;
                  this.addressArr.push(p);
                }

                setTimeout(
                  function() {
                    axios
                      .get(`https://api.hh.ru/vacancies/${element["id"]}`)
                      .then(response => {
                        this.result.push(response.data);
                        this.counter = this.result.length;
                      })
                      .catch(e => {
                        //this.errors.push(e)
                        console.log(e);
                      });
                  }.bind(this),
                  i * 1000
                );
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
