<template>
  <div>    
   <b-btn @click="run">Заполнить skills</b-btn>
   <b-btn @click="getskills">Вывести одинаковые</b-btn>
    <br>
    <br>
  <!-- <div>{{ salaryArr }}</div> -->
    <div>Кол-во вакансий с заполненными ЗП - {{ salaryNotNull.length }} из {{ arr.length }}</div>
    <div>{{ salaryArr }}</div>
    <!-- <div>Кол-во вакансий с заполненными навыками - {{ skillsNotNull.length }} из {{ arr.length }}</div> -->
    <br>
     <!-- <div v-for="(value, key, index) in sortable" :key="index">{{ value }} </div> -->
     <br>

  </div>
</template>

<script>

export default {
  data() {
      return {
        skills: String,
        skillsArr: [],
        salaryArr: [],
        resArr: [],
        sortable: [],
        skillsNotNull: [],
        salaryNotNull: [],
        skillsSortByTheSame: Object,
        res: Object

      }
  },
  props: {
    arr: Array
  },
  methods: {
      getskills() {
        var result = this.skillsArr.reduce(function(acc, el) {
        acc[el] = (acc[el] || 0) + 1;
        return acc;
        }, {});

for (var item in result) {
    this.sortable.push([item, result[item]]);
}

this.sortable.sort(function(a, b) {
    return b[1] - a[1];
});

  let res = {};
  this.sortable.forEach((element, i) => {
                 res[element[0]] = element[1]
            });  

    var maxSpeed = {
    car: 300, 
    bike: 60, 
    motorbike: 200, 
    airplane: 1000,
    helicopter: 400, 
    rocket: 8 * 60 * 60
};
var sortable = [];
for (var vehicle in maxSpeed) {
    sortable.push([vehicle, maxSpeed[vehicle]]);
}

sortable.sort(function(a, b) {
    return a[1] - b[1];
});

      },
    run() {

        this.arr.forEach((element, i) => {
          if (element.key_skills.length !=0 ) {
          this.skillsNotNull.push(element);  
          //console.log(element);
          }  
                 element.key_skills.forEach((element, i) => {
                 this.skillsArr.push(element.name);
            });    
        });   

            this.arr.forEach((element, i) => {

         

          if (element.salary && element.salary.currency == 'RUR') {
          this.salaryNotNull.push(element);

              //console.log(element.salary.from);
              //console.log(element.salary.to);

              // if (element.salary.from = 4000) {
              //   console.log(element);
              //   }
          
          if (element.salary.from  == null) {
               this.salaryArr.push(element.salary.to);
          }

          if (element.salary.to  == null) {
               this.salaryArr.push(element.salary.from);
          }
           
           if (element.salary.to != null & element.salary.from != null) {
              this.salaryArr.push((element.salary.from + element.salary.to)/2);
          }          

          }  
        });    
    
    
    let average = (array) => array.reduce((a, b) => a + b) / array.length;
console.log(average(this.salaryArr));
}
  }
};
</script>

<style>
</style>

      
      