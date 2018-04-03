import View from './view.js';
import Model from './model.js';

class Controller {

    constructor(data) {
      this.data = data.data;
      this.dataFromModelToView = this.data;
      this.valueSearch = "";
      this.sort = "undefined";
      this.numberForStartSearch = 3;
      this.model = new Model(this.data);
      this.view = new View(this.data);
      this.view.keyUpOnSearch(this.enterCharacters.bind(this));
      this.view.clickOnSort(this.sorting.bind(this));
      this.view.clickOnContainer(this.callClickOnContainer.bind(this));
      this._renderNewData(this.numberForStartSearch);
    }

    callClickOnContainer() {
      let eventTarget = this.view.whatIsEvent(event);
      this._addToFavorites(eventTarget);
    }

    _addToFavorites(eventTarget) {
      if(eventTarget.classList.contains("table__cell--like")){
        let buttonFavorites = eventTarget;
        this.view.changeStateFavoritesButton(buttonFavorites);
      }
    }

    sorting() {
      let valueSort = this.view.valueSort(event);
      this.view.changeClassSort(valueSort);
      this.sort = valueSort;
      this._renderNewData(this.numberForStartSearch);
    }

    enterCharacters() {
    	this._renderNewData(this.numberForStartSearch);
    }

    _newDataFromModelToRender(dataFromModelToView) {
    	this.view.renderData(dataFromModelToView);
    }

    _renderNewData(numberForStartSearch) {
      this.valueSearch = this.view.valueSearch();
      this.dataFromModelToView = this.model.upGradeDataFunction(this.valueSearch, this.sort, numberForStartSearch);
      this._newDataFromModelToRender(this.dataFromModelToView);
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
