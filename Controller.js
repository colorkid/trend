import View from './view.js';
import Model from './model.js';

export default class Controller {

    constructor(data) {
      this.initModel(data.data);
      this.model.createFavoritesData();
      this.valueSearch = "";
      this.sort = undefined;
      /*this.view = new View();
      this.view.keyUpOnSearch(this.enterCharacters.bind(this));
      this.view.clickOnSort(this.sorting.bind(this));
      this.view.clickOnContainer(this.callClickOnContainer.bind(this));
      this.view.clickOnFavoriteButton(this.callFavoriteButton.bind(this));
      this.view.clickOnAllButton(this.callAllButton.bind(this));
      this.view.clickOnDeleteAllButton(this.callDeleteAllButton.bind(this));*/
      this.view = new View({
        keyUpOnSearch: this.enterCharacters.bind(this),
        clickOnSort: this.sorting.bind(this),
        clickOnContainer: this.callClickOnContainer.bind(this),
        clickOnFavoriteButton: this.callFavoriteButton.bind(this),
        clickOnAllButton: this.callAllButton.bind(this),
        clickOnDeleteAllButton: this.callDeleteAllButton.bind(this)
      });

      this._renderNewData(Controller.numberForStartSearch);
    }

    initModel(data) {
      let setIdFavoritesFromLocal = JSON.parse(localStorage.getItem('idFavoritesLocalStorage'));
      this.model = new Model(data, setIdFavoritesFromLocal);
      Controller.numberForStartSearch = 3;
    }

    setLocalStorageData() {
      let arrFromSet = Array.from(this.model.favoritesIdSet);
      let serialLocalStorageData = JSON.stringify(arrFromSet);
      localStorage.setItem('idFavoritesLocalStorage', serialLocalStorageData);
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
        this.setLocalStorageData();
      }
    }

    _addOrRemoveInFavorites(eventTarget) {
      if(!eventTarget.classList.contains("table__cell--on-like")){
        this.model.removeFavoritesId(eventTarget.dataset.id);
        return;
      }
      this.model.addFavoritesId(eventTarget.dataset.id);
    }

    sorting() {
      let valueSort = this.view.valueSort(event);
      this.view.changeClassSort(valueSort);
      this.sort = valueSort;
      this._renderNewData(Controller.numberForStartSearch);
    }

    enterCharacters() {
    	this._renderNewData(Controller.numberForStartSearch);
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
