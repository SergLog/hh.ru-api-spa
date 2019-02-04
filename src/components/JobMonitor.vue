<template>
   <b-container>
       
        <h1>Мониторинг вакансий.</h1> <br>
        <p>Например: vue.js - 425 вакансий на сегодняшний день, Javascript - 2566 вакансий.</p>
        <p>История - таблица или график, где будет видно изменение количества вакансий, например, еженедельно.</p>
        <p>дата</p>
       
       
        <b-row>
               <b-col cols="2">
                    <b-table striped hover :items="tableItems" :fields="fields"></b-table>
               </b-col>
        </b-row>
       
    </b-container>
</template>

<script>
export default {
    name: 'job-monitor',
    data () {
        return {
            jobs: [
                { 
                    jobId : 1, 
                    requestString : "Vue.js" 
                },
                { 
                    jobId : 2, 
                    requestString : "Javascript" 
                }
            ],
            History: [
                {
                    historyId: 1,
                    jobId: 1,
                    count: 25,
                    date: "2019-02-04"
                }
            ],

            tableItems: [
                { requestString: "Vue.js", count: 25 },
                { requestString: "Javascript", count: 35 }
            ],
            fields: [
                {
                    key: 'requestString',
                    label: 'Вакансия'
                },
                {
                    key: 'count',
                    label: 'Количество'
                }
            ]
        }
    }
}
</script>

