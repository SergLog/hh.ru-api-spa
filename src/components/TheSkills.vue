<template>
  <div>    
   <b-btn @click="run">Заполнить skills</b-btn>
   <b-btn @click="getskills">Вывести одинаковые</b-btn>
    <div>{{ skillsCnt }}</div>
  </div>
</template>

<script>

export default {
  data() {
      return {
      skillsArr: [],
      skillsCnt: Object

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

    this.skillsCnt = result;    
    //JSON.stringify(result, null, 2);        

      },
    run() {

        this.arr.forEach((element, i) => {
                 element.key_skills.forEach((element, i) => {
                 this.skillsArr.push(element.name);
            });    
        });   
    }
  }
};
</script>

<style>
</style>

      