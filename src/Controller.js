import View from './view.js';
import Model from './model.js';

export default class Controller {

    constructor(data) {
      this.initModel(data.data);
      this.model.createFavoritesData();
      this.valueSearch = "";
      this.sort = undefined;
      this.view = new View({
        onKeyUpSearch: this.setOnKeyUpSearch.bind(this),
        onClickSort: this.setOnClickSort.bind(this),
        onClickAddFavoriteButton: this.setOnClickAddFavoriteButton.bind(this),
        onClickShowFavoriteItemsButton: this.setOnClickShowFavoriteItemsButton.bind(this),
        onClickAllButton: this.setOnClickAllButton.bind(this),
        onClickOnDeleteAllButton: this.setOnClickOnDeleteAllButton.bind(this)
      });
      this._renderNewData();
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

    setOnClickOnDeleteAllButton() {
      this.model.cleanFavoritesData(this.dataFromModelToView);
      this.view.renderData(this.model.favoritesData);
      this.dataFromModelToView = this.model.data;
      this.setLocalStorageData();
    }

    setOnClickAllButton() {
      this.view.renderData(this.dataFromModelToView);
      this.view.diplayUi("enable");
    }

    setOnClickShowFavoriteItemsButton() {
      this.view.renderData(this.model.favoritesData);
      this.view.diplayUi("disabled");
    }

    setOnClickAddFavoriteButton(event) {
      let selectedButtonGoToFavotite = false;

      if(event.target.classList.contains("table__cell--like") && !event.target.classList.contains("table__cell--on-like")){
        this.model.addFavoritesId(event.target.dataset.id);
        selectedButtonGoToFavotite = true;
      }

      else if(event.target.classList.contains("table__cell--like") && event.target.classList.contains("table__cell--on-like")) {
        this.model.removeFavoritesId(event.target.dataset.id);
        selectedButtonGoToFavotite = false;
      }

      else {
        return;
      }

      this.view.changeStateFavoritesButton(event.target, selectedButtonGoToFavotite);
      this.setLocalStorageData();
    }

    setOnClickSort(event) {
      if(event.target.classList.contains("arrow--selected")){
        this.view.changeClassSort(undefined);
        this.sort = null;
      }

      else {
        this.view.changeClassSort(event.target.dataset.arrow);
        this.sort = event.target.dataset.arrow;
      }

      this._renderNewData();
    }

    setOnKeyUpSearch(event) {
      this.valueSearch = event.target.value;
    	this._renderNewData();
    }

    _newDataFromModelToRender(dataFromModelToView) {
    	this.view.renderData(dataFromModelToView);
    }

    _renderNewData() {
      const valueSearch = (this.valueSearch.length < Controller.numberForStartSearch) ? "" : this.valueSearch;
      this.dataFromModelToView = this.model.upGradeDataFunction(valueSearch, this.sort, Controller.numberForStartSearch);
      this._newDataFromModelToRender(this.dataFromModelToView);
    }
}

