import View from './view.js';
import Model from './model.js';

export default class Controller {

    constructor(data) {
      this.initModel(data.data);
     // this.model = new Model(data.data);
      this.dataFromModelToView = this.model.addIndexItem(data.data);
      this.valueSearch = "";
      this.sort = "undefined";
      this.numberForStartSearch = 3;
      this.view = new View();
      this.view.keyUpOnSearch(this.enterCharacters.bind(this));
      this.view.clickOnSort(this.sorting.bind(this));
      this.view.clickOnContainer(this.callClickOnContainer.bind(this));
      this.view.clickOnFavoriteButton(this.callFavoriteButton.bind(this));
      this.view.clickOnAllButton(this.callAllButton.bind(this));
      this.view.clickOnDeleteAllButton(this.callDeleteAllButton.bind(this));
      this._renderNewData(this.numberForStartSearch);
    }

    initModel(data) {
    /*  let dataForStart = data.data;
      let fromLocalFavoritesData = [];
      let fromLocalfavoritesIndexArr = [];

      if (localStorage.getItem('dataLocal') !== null) {
        dataForStart = JSON.parse(localStorage.getItem('dataLocal'));
        fromLocalFavoritesData = JSON.parse(localStorage.getItem('favoritesData'));
        fromLocalfavoritesIndexArr = JSON.parse(localStorage.getItem('favoritesIndexArr'));

        this.model = new Model(dataForStart);
        this.model.favoritesIndexArr = fromLocalfavoritesIndexArr;
        this.model.favoritesData = fromLocalFavoritesData;
        this.dataFromModelToView = dataForStart;
      }

      else {
        this.model = new Model(dataForStart);
        this.dataFromModelToView = this.model.addIndexItem(dataForStart);
      }
    */

      //new
      let setIdFavoritesFromLocal = JSON.parse(localStorage.getItem('idFavoritesLocalStorage'));
      this.model = new Model(data, setIdFavoritesFromLocal);
    }

    setLocalStorageData() {
      //new
      let arrFromSet = Array.from(this.model.favoritesIdSet);
      let serialLocalStorageData = JSON.stringify(arrFromSet);
      localStorage.setItem('idFavoritesLocalStorage', serialLocalStorageData);

     /* this.model.createFavoritesData(this.model.favoritesIndexArr);

      let serialLocalStorageData = JSON.stringify(this.model.data);
      localStorage.setItem('dataLocal', serialLocalStorageData);

      let serialLocalStorageFavoritesData = JSON.stringify(this.model.favoritesData);
      localStorage.setItem('favoritesData', serialLocalStorageFavoritesData);

      let serialLocalStorageFavoritesIndexArr = JSON.stringify(this.model.favoritesIndexArr);
      localStorage.setItem('favoritesIndexArr', serialLocalStorageFavoritesIndexArr);*/
    }

    callDeleteAllButton() {
      this.model.cleanFavoritesData(this.dataFromModelToView);
      this.view.renderData(this.model.favoritesData);
      this.dataFromModelToView = this.model.data;
      localStorage.clear();
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
      let indexItem = eventTarget.dataset.index;
    
      if(!eventTarget.classList.contains("table__cell--on-like")){
        this.model.removeFavoritesItem(indexItem);

        //new
        this.model.removeFavoritesId(eventTarget.dataset.id);

        return;
      }

      this.model.addFavoritesItem(indexItem);


      //new
      this.model.addFavoritesId(eventTarget.dataset.id);
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
