import View from './view.js';
import Model from './model.js';
import renderData from './renderData.js';

class Controller {

    constructor(data) {
      this.data = data.data;
      this.dataFromModelToView = this.data;
      this.sort = "undefined";
      this.model = new Model(this.data);
      this.view = new View(this.data);

      this.view.keyUpOnSearch(this.enterCharacters.bind(this));
      this.view.clickOnSort(this.sorting.bind(this));
    }

    sorting() {
      let valueSort = this.view.valueSort(event);
      this.view.changeClassSort(valueSort);
      this.sort = valueSort;

      this.renderNewData(this.dataFromModelToView);
    }

    enterCharacters() {
    	let valueSearch = this.view.valueSearch();
    	this.dataFromModelToView = this.model.searchModel(valueSearch);

    	if(valueSearch.length < 3) this.dataFromModelToView = this.data; // меняем результат когда введено не менее 3 символов

    	this.renderNewData(this.dataFromModelToView);
      
    }

    renderNewData(dataFromModelToView) {
    	renderData(dataFromModelToView, this.sort);
    }

}

function startApp() {
  fetch('data.json')
    .then(function(response) {
        return response.json();
    }).then(function(data) {

      //Только при удачной подргузки данных, мы запускаем приложение;
      const controller = new Controller(data);

    }).catch(function(err) {
      console.log(err.name);
      console.log(err.message);
      console.log(err.stack);
      return;
    });
}



document.addEventListener("DOMContentLoaded", startApp);
