import View from './view.js';
import Model from './model.js';

class Controller {

    constructor(data) {
    	this.data = data.data;
      	this.model = new Model(this.data);
      	this.view = new View(this.data);

      	this.view.keyUpOnSearch(this.enterCharacters.bind(this));
    }

    enterCharacters() {
    	let valueSearch = this.view.valueSearch();
    	let dataFromModelToView = this.model.searchModel(valueSearch);

    	if(valueSearch.length < 3) dataFromModelToView = this.data; // меняем результат когда введено не менее 3 символов

    	this.renderNewData(dataFromModelToView);

    }

    renderNewData(dataFromModelToView) {
    	this.view.renderData(dataFromModelToView);
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