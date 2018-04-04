import View from './view.js';
import Model from './model.js';

class Controller {

    constructor(data) {
      this.data = data.data;
      this.model = new Model(this.data);
      this.dataWhitIndex = this.model.addIndexItem(this.data);
      this.dataFromModelToView = this.dataWhitIndex;
      this.valueSearch = "";
      this.sort = "undefined";
      this.numberForStartSearch = 3;
      this.view = new View(this.dataWhitIndex);
      this.view.keyUpOnSearch(this.enterCharacters.bind(this));
      this.view.clickOnSort(this.sorting.bind(this));
      this.view.clickOnContainer(this.callClickOnContainer.bind(this));
      this.view.clickOnFavoriteButton(this.callFavoriteButton.bind(this));
      this.view.clickOnAllButton(this.callAllButton.bind(this));
      this.view.clickOnDeleteAllButton(this.callDeleteAllButton.bind(this));
      this._renderNewData(this.numberForStartSearch);
    }

    callDeleteAllButton() {
      this.model.cleanFavoritesData(this.dataFromModelToView);
      this.view.renderData(this.model.favoritesData);
      this.dataFromModelToView = this.model.data;
    }

    callAllButton() {
      this.view.renderData(this.dataFromModelToView);
      this.view.hideDeleteAllButton();
      this.view.includedUi();
    }

    callFavoriteButton() {
      this.view.renderData(this.model.favoritesData);
      this.view.showDeleteAllButton();
      this.view.disabledUi();
    }

    callClickOnContainer() {
      let eventTarget = this.view.whatIsEvent(event);
      this._addRemoveInFavorites(eventTarget);
    }

    _addRemoveInFavorites(eventTarget) {
      if(eventTarget.classList.contains("table__cell--like")){
        this.view.changeStateFavoritesButton(eventTarget);
        this._addOrRemoveInFavorites(eventTarget);
      }
    }

    _addOrRemoveInFavorites(eventTarget) {
      let indexItem = eventTarget.dataset.index;
    
      if(!eventTarget.classList.contains("table__cell--on-like")){
        this.model.removeFavoritesItem(indexItem);
        return;
      }

      this.model.addFavoritesItem(indexItem);
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
