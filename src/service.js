import axios from "axios";
export let vacancies = [];

export class DataAPI {
  constructor() {
    //var vacancies = [];
    this.PagesCount = 1;
  }

  // getData(callback) {
  //     axios.get(`https://api.hh.ru/vacancies/?text=vue+&area=1&per_page=100`)
  //         .then(response => {
  //             this.vacancies = response.data.items;
  //             console.log(response.data);
  //             callback(this.vacancies);
  //         })
  //         .catch(e => {
  //             // this.errors.push(e)
  //             console.log(e);
  //         })
  // }

  getDatae(callback) {
    axios
      .get(`https://api.hh.ru/vacancies/?text=vue+&area=1&per_page=100`)
      .then(response => {
        this.vacancies = response.data.items;
        console.log(response.data);
        callback(this.vacancies);
      })
      .catch(e => {
        // this.errors.push(e)
        console.log(e);
      });
  }
  getData(getDataCallback) {
    //let PagesCount;

    axios
      .get(`https://api.hh.ru/vacancies/?text=vue+&area=1&per_page=100`)
      .then(response => {
        // this.PagesCount = response.data.pages;
        getPageCntCallback(response.data.pages);
      })
      .catch(e => {
        console.log(e);
      });

    function getPageCntCallback(val) {
      //что-то делаем с val и получаем массив данных data
      getDataCallback(data);
    }
  }
  getAllData() {
    let Pages = 4;

    function getFromAPI() {
      let Arr = [];
      axios
        .get(`https://api.hh.ru/vacancies/?text=vue+&area=1&per_page=100`)
        .then(response => {
          // this.PagesCount = response.data.pages;
          Arr = response.data.items;
          console.log(Arr);
        })
        .catch(e => {
          console.log(e);
        });
    }
    getFromAPI();
  }
}
