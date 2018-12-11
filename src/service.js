import axios from "axios";
export let vacancies = [];

export class DataAPI {
    constructor() {
        //var vacancies = [];
    }
    getData(callback) {

        axios.get(`https://api.hh.ru/vacancies/?text=vue+&area=1&per_page=10&page=1`)
            .then(response => {
                this.vacancies = response.data.items;
                callback(this.vacancies);
            })
            .catch(e => {
                // this.errors.push(e)
                console.log(e);
            })
    }


}

