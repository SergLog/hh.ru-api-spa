<template>
  <div id="app">
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Серёга что-то мутит" active>
          <!-- <test-a-p-i></test-a-p-i> -->
          <b-btn @click="get">Получить массив</b-btn>
          <b-btn @click="getDataTest">Проверка массива из 100 вакансий</b-btn>

          <b-btn @click="getidarr">Получить массив id-ков</b-btn>
          <div>{{ arr[0] }}</div>

          <div>{{ vacans }}</div>

        </b-tab>
        <b-tab title="Карта">
          <the-map></the-map>
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

export default {
  name: "app",
  components: { TestAPI, TheMap },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      arr: [],
      vacans: []
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
    fillarray: function(arr){ 
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
        //console.log(pagesCount);
        //callback(this.vacancies);
        runLoop.call(this, pagesCount);
        
      })
      .catch(e => {
        // this.errors.push(e)
        console.log(e);
      });        
 
function runLoop(cnt) {  

let arrtemp = [];

while (i < cnt) {
  
  //console.log(i);
   // setTimeout(function () {

    axios
      .get(`https://api.hh.ru/vacancies/?text=vue+&area=1&per_page=100&page=${i}`)
      .then(response => {
        //this.vacans.push.apply(this.vacans, response.data.items);
        //console.log(this.vacans);
        //console.log(response.data.items)
        //this.vacans.push(response.data.items); 
        //this.vacans.concat(response.data.items);
        //this.vacans = response.data.items;
        //this.vacans.push(response.data.items);
        //console.log(response.data.items);
        arrtemp.push(response.data.items);
        //console.log(arrtemp);
        
        if (cnt === 4)  {
            for(var n in arrtemp) {
                  this.vacans = this.vacans.concat(arrtemp[n]);
            }
            console.log(this.vacans);
        }
        // this.vacans.push(arrtemp[0])
        // this.vacans.concat(arrtemp[1]);

        // console.log(this.vacans);
        //console.log(typeof(response.data.items));
        //console.log(this.vacans);
        //console.log(arrtemp);
      
      })
      .catch(e => {
        // this.errors.push(e)
        console.log(e);
      });
      i++;
      //  }.bind(this), i*200);	
}
  //console.log(this.vacans);
}

  }
  }
};
</script>

<style>
</style>
