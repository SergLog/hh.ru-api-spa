<template>
  <div>

{{ vacancies1.length }}
{{ vacancies2.length }}

<p></p>
<b-btn @click="testone">get data</b-btn>
<b-btn @click="testarr">test array</b-btn>
<div ref="id"></div>

  </div>
</template>

<script>
'use strict'
require('babel-polyfill');

import axios from 'axios'

  export default {
  name: 'TestAPI',
  
  data() {
    return {
      vacancies1: [],    
      vacancies2: [],
      vacancies3: [],
       res: "gggg",
       vacancy: {},
       result: [],
       idArray: []
    }
  },
  
  created() {
    axios.get(`https://api.hh.ru/vacancies/?text=vue+&area=1&per_page=10&page=1`)
    .then(response => {
      this.vacancies1 = response.data.items;
    })
    .catch(e => {
      this.errors.push(e)
    })

     axios.get(`https://api.hh.ru/vacancies/?text=vue&area=1&per_page=100&page=1`)
    .then(response => {
      this.vacancies2 = response.data.items;
    })
    .catch(e => {
      this.errors.push(e)
    })    
  },

  methods: {
    joinArrays: function() {
        // this.vacancies3 = this.vacancies1.concat(this.vacancies2) 
        // this.$refs.id.innerText = JSON.stringify(this.vacancies3[0]["id"]);
        
      var arr = [];

      this.vacancies1.forEach(function(element) {
        arr.push(element["id"]);
      });

      this.idArray = arr;
              // console.log(arr);
            // this.$refs.id.innerText = JSON.stringify(idAarray);

    //     var VacancyAarray = [];
    //         idArray.forEach(function(element) {
              
    //               // axios.get(`https://api.hh.ru/vacancies/${element}`)
                  
    //               axios.get(`https://api.hh.ru/vacancies/${element}`, {headers: {'Access-Control-Allow-Origin': '*', "Access-Control-Allow-Headers": "Content-Type"}})
    // .then(response => {
    //   // this.vacancy = response.data;
    //   //  VacancyArray.push(this.vacancy);
    // })
    // .catch(e => {
    //   this.errors.push(e)
    //   this.$refs.id.innerText = e.innerText;
    // }) 
         
    //     });
    //      console.log(VacancyAarray.length);
     },
     testone: function() {
       //var arr = [];
       //var element = '28764941';
            this.joinArrays();          

          var res = [];

          var arr = this.idArray;


            arr.forEach(function(el, i) {
           
                

           setTimeout(function () {

         
    axios.get(`https://api.hh.ru/vacancies/${el}`)
     .then(response => {
      //this.vacancy = response.data;
      //console.log(response.data);
      //console.log(this.result);
       
      //console.log(response.data);
      this.result.push(response.data); 
      //console.log(res.length);
      // console.log(response.data);
      //console.log(el);
      
    })
      .catch(e => {
      this.errors.push(e)
    }) 
           }.bind(this), i * 200);
		            
           
     }.bind(this))


          // this.$refs.id.innerText = this.res.length;
          

     },
     testarr: function() {
       console.log(this.result);
     }

  }
}

</script>


<style scoped>
</style>