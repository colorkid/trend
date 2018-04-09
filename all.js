'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*import Controller from './Controller.js';*/

function startApp() {
    var request = new XMLHttpRequest();
    request.open('GET', 'data.json', true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            new Controller(JSON.parse(request.responseText));
        } else {
            request.onerror();
        }
    };

    request.onerror = function (err) {
        console.log(err.name);
        console.log(err.message);
        console.log(err.stack);
    };

    request.send();
}

document.addEventListener("DOMContentLoaded", startApp);
/*import View from './view.js';
import Model from './model.js';

export default*/
var Controller = function () {
    function Controller(data) {
        _classCallCheck(this, Controller);

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

    _createClass(Controller, [{
        key: 'initModel',
        value: function initModel(data) {
            var setIdFavoritesFromLocal = JSON.parse(localStorage.getItem('idFavoritesLocalStorage'));
            this.model = new Model(data, setIdFavoritesFromLocal);
            Controller.numberForStartSearch = 3;
        }
    }, {
        key: 'setLocalStorageData',
        value: function setLocalStorageData() {
            var arrFromSet = Array.from(this.model.favoritesIdSet);
            var serialLocalStorageData = JSON.stringify(arrFromSet);
            localStorage.setItem('idFavoritesLocalStorage', serialLocalStorageData);
        }
    }, {
        key: 'setOnClickOnDeleteAllButton',
        value: function setOnClickOnDeleteAllButton() {
            this.model.cleanFavoritesData(this.dataFromModelToView);
            this.view.renderData(this.model.favoritesData);
            this.dataFromModelToView = this.model.data;
            this.setLocalStorageData();
        }
    }, {
        key: 'setOnClickAllButton',
        value: function setOnClickAllButton() {
            this.view.renderData(this.dataFromModelToView);
            this.view.diplayUi("enable");
        }
    }, {
        key: 'setOnClickShowFavoriteItemsButton',
        value: function setOnClickShowFavoriteItemsButton() {
            this.view.renderData(this.model.favoritesData);
            this.view.diplayUi("disabled");
        }
    }, {
        key: 'setOnClickAddFavoriteButton',
        value: function setOnClickAddFavoriteButton(event) {
            var selectedButtonGoToFavotite = false;

            if (event.target.classList.contains("table__cell--like") && !event.target.classList.contains("table__cell--on-like")) {
                this.model.addFavoritesId(event.target.dataset.id);
                selectedButtonGoToFavotite = true;
            } else if (event.target.classList.contains("table__cell--like") && event.target.classList.contains("table__cell--on-like")) {
                this.model.removeFavoritesId(event.target.dataset.id);
                selectedButtonGoToFavotite = false;
            } else {
                return;
            }

            this.view.changeStateFavoritesButton(event.target, selectedButtonGoToFavotite);
            this.setLocalStorageData();
        }
    }, {
        key: 'setOnClickSort',
        value: function setOnClickSort(event) {
            if (event.target.classList.contains("arrow--selected")) {
                this.view.changeClassSort(undefined);
                this.sort = null;
            } else {
                this.view.changeClassSort(event.target.dataset.arrow);
                this.sort = event.target.dataset.arrow;
            }

            this._renderNewData();
        }
    }, {
        key: 'setOnKeyUpSearch',
        value: function setOnKeyUpSearch(event) {
            this.valueSearch = event.target.value;
            this._renderNewData();
        }
    }, {
        key: '_newDataFromModelToRender',
        value: function _newDataFromModelToRender(dataFromModelToView) {
            this.view.renderData(dataFromModelToView);
        }
    }, {
        key: '_renderNewData',
        value: function _renderNewData() {
            var valueSearch = this.valueSearch.length < Controller.numberForStartSearch ? "" : this.valueSearch;
            this.dataFromModelToView = this.model.upGradeDataFunction(valueSearch, this.sort, Controller.numberForStartSearch);
            this._newDataFromModelToRender(this.dataFromModelToView);
        }
    }]);

    return Controller;
}();

//сниппеты от https://30secondsofcode.org/


var minN = function minN(arr) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return [].concat(_toConsumableArray(arr)).sort(function (a, b) {
        return a - b;
    }).slice(0, n);
};
var maxN = function maxN(arr) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return [].concat(_toConsumableArray(arr)).sort(function (a, b) {
        return b - a;
    }).slice(0, n);
};

/*export default*/
var Model = function () {
    function Model(data, setIdFavoritesFromLocal) {
        _classCallCheck(this, Model);

        this.data = data;
        this.favoritesIdSet = new Set(setIdFavoritesFromLocal);
        this.favoritesData = [];

        Model.fromLowToHight = function (a, b) {
            return a[0] > b[0] ? 1 : -1;
        };

        Model.fromHightToLow = function (a, b) {
            return a[0] < b[0] ? 1 : -1;
        };
    }

    _createClass(Model, [{
        key: 'cleanFavoritesData',
        value: function cleanFavoritesData(data) {
            this.favoritesIdSet = new Set();
            this.favoritesData = [];

            for (var i = 0; i < this.data.length; i++) {
                this.data[i].dataFavorites = false;
            }
        }
    }, {
        key: 'addFavoritesId',
        value: function addFavoritesId(id) {
            this.favoritesIdSet.add(id);
            this.createFavoritesData();
        }
    }, {
        key: 'removeFavoritesId',
        value: function removeFavoritesId(id) {
            this.favoritesIdSet.delete(id);
            this.createFavoritesData();
        }
    }, {
        key: 'createFavoritesData',
        value: function createFavoritesData() {
            var _this = this;

            this.favoritesData = [];

            var _loop = function _loop(i) {

                _this.data[i].dataFavorites = false;

                _this.favoritesIdSet.forEach(function (id) {
                    if (_this.data[i].builderName === id) {
                        _this.data[i].dataFavorites = true;
                        _this.favoritesData.push(_this.data[i]);
                    }
                });
            };

            for (var i = 0; i < this.data.length; i++) {
                _loop(i);
            }

            this._upGradeDataFunctionStateOfFavorites();
        }
    }, {
        key: '_upGradeDataFunctionStateOfFavorites',
        value: function _upGradeDataFunctionStateOfFavorites() {
            return this.data;
        }
    }, {
        key: '_sorting',
        value: function _sorting(upGradeData, sortValue) {
            var plansPercentOneDeveloper = [];
            var directionSort = void 0;

            for (var i = 0; i < upGradeData.length; i++) {
                var plansPercentOneObject = [];

                for (var j = 0; j < upGradeData[i].blocks.length; j++) {
                    plansPercentOneObject.push(parseFloat([upGradeData[i].blocks[j].blockPlanPercent]));
                }

                if (sortValue === "fromLowToHight") {
                    plansPercentOneDeveloper.push([minN(plansPercentOneObject)[0], i]);
                    directionSort = Model.fromLowToHight;
                } else if (sortValue === "fromHightToLow") {
                    plansPercentOneDeveloper.push([maxN(plansPercentOneObject)[0], i]);
                    directionSort = Model.fromHightToLow;
                } else {
                    plansPercentOneDeveloper.push([plansPercentOneObject[0], i]);
                }
            }

            //Я тут directionSort каждый раз перезаписываю в цикле, так как там есть if и т.д., нехотелось бы данную конструкцию дублировать ниже
            plansPercentOneDeveloper.sort(directionSort);

            return this._createdSortedArr(plansPercentOneDeveloper, upGradeData);
        }

        //создаем отсортированный массив sortedArr, беря индекс элементов из plansPercentOneDeveloper и item из upGradeData

    }, {
        key: '_createdSortedArr',
        value: function _createdSortedArr(plansPercentOneDeveloper, upGradeData) {
            var indexArr = [];
            var sortedArr = [];

            for (var i = 0; i < plansPercentOneDeveloper.length; i++) {
                indexArr.push(plansPercentOneDeveloper[i][1]);
            }

            for (var _i = 0; _i < indexArr.length; _i++) {
                sortedArr.push(upGradeData[indexArr[_i]]);
            }

            return sortedArr;
        }
    }, {
        key: 'upGradeDataFunction',
        value: function upGradeDataFunction(valueSearch, sort, numberForStart) {
            var sortValue = sort;
            var upGradeData = [];
            var simbolsForSearch = valueSearch.toUpperCase();

            for (var i = 0; i < this.data.length; i++) {

                if (this.data[i].builderName.toUpperCase().includes(simbolsForSearch)) {
                    upGradeData.push(this.data[i]);

                    continue;
                }

                for (var j = 0; j < this.data[i].blocks.length; j++) {

                    if (this.data[i].blocks[j].blockName.toUpperCase().includes(simbolsForSearch)) {
                        upGradeData.push(this.data[i]);
                    }
                }
            }

            upGradeData = this._sorting(upGradeData, sortValue);

            return upGradeData;
        }
    }]);

    return Model;
}();
/*export default*/

function templateDeveloper(developer) {
    var row = document.createElement("div");
    row.className = "table__row";

    row.innerHTML = '\n  \t<div class="table__cell table__cell--builder">' + developer.builderName + '</div>\n  \t<div class="table__cell table__cell--blocks"></div>\n   \t<div class="table__cell table__cell--marketing">' + developer.builderAdverticement + '</div>\n    <div class="table__cell table__cell--like ' + (developer.dataFavorites ? "table__cell table__cell--on-like" : "") + '" data-id="' + developer.builderName + '">' + (developer.dataFavorites ? "Убрать из изрбанного" : "Добавить в избранное") + '</div>\n   \t';

    return row;
}
/*export default*/function templateObject(objects) {
    var object = document.createElement("div");
    object.className = "block__item";

    object.innerHTML = '\n\t\t<div class="block__names"><span>\u041E\u0431\u044A\u0435\u043A\u0442</span>: ' + objects.blockName + '</div>\n\t\t<div class="block__percent block__percent--plan"><span>\u041F\u043B\u0430\u043D\u0438\u0440\u0443\u0435\u043C\u044B\u0439 %</span>: ' + objects.blockPlanPercent + '</div>\n\t\t<div class="block__percent block__percent--priority"><span>\u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442\u043D\u044B\u0439 %</span>: ' + objects.blockPriorityPercent + '</div>\n\t\t<div class="block__percent block__percent--min-max"><span>Min/Max %</span>: ' + objects.blockMinMaxPercent + '</div>\n\t\t<div class="block__percent block__percent--reward"><span>\u041D\u0430\u0433\u0440\u0430\u0436\u0434\u0430\u0435\u043C\u044B\u0439 %</span>: ' + objects.blockRewardPercent + '</div>\n    ';

    return object;
}
/*import templateDeveloper from './templateDeveloper.js';
import templateObject from './templateObject.js';*/

/*export default*/
var View = function () {
    function View(handlers) {
        _classCallCheck(this, View);

        this.container = document.querySelector("#container");
        this.arrowsWrapper = document.querySelector(".arrows");
        this.arrows = document.querySelectorAll(".arrow");
        this.search = document.querySelector("#search");
        this.favoriteButton = document.querySelector("#favorites-button");
        this.allButton = document.querySelector("#all-button");
        this.deleteAllButton = document.querySelector("#delete-all");

        for (var i = 0; i < this.arrows.length; i++) {
            this.arrows[i].addEventListener("click", handlers.onClickSort);
        }

        this.search.addEventListener("keyup", handlers.onKeyUpSearch);
        this.container.addEventListener("click", handlers.onClickAddFavoriteButton);
        this.favoriteButton.addEventListener("click", handlers.onClickShowFavoriteItemsButton);
        this.allButton.addEventListener("click", handlers.onClickAllButton);
        this.deleteAllButton.addEventListener("click", handlers.onClickOnDeleteAllButton);
    }

    _createClass(View, [{
        key: 'diplayUi',
        value: function diplayUi(state) {
            if (state === "enable") {
                this.search.removeAttribute("disabled");
                this.arrowsWrapper.classList.remove("arrows--disabled");
                this.deleteAllButton.classList.remove("button--show");
                return;
            }

            this.search.setAttribute("disabled", "true");
            this.arrowsWrapper.classList.add("arrows--disabled");
            this.deleteAllButton.classList.add("button--show");
        }
    }, {
        key: 'showHideDeleteAllButton',
        value: function showHideDeleteAllButton(state) {
            this.deleteAllButton.classList.remove("button--show");
        }
    }, {
        key: 'changeStateFavoritesButton',
        value: function changeStateFavoritesButton(buttonFavorites, state) {
            if (state === true) {
                buttonFavorites.textContent = "Убрать из изрбанного";
                buttonFavorites.classList.add("table__cell--on-like");
            } else {
                buttonFavorites.textContent = "Добавить в избранное";
                buttonFavorites.classList.remove("table__cell--on-like");
            }
        }
    }, {
        key: 'changeClassSort',
        value: function changeClassSort(value) {

            for (var i = 0; i < this.arrows.length; i++) {

                if (this.arrows[i].dataset.arrow === value && !this.arrows[i].classList.contains("arrow--selected")) {
                    this.arrows[i].classList.add("arrow--selected");
                } else {
                    this.arrows[i].classList.remove("arrow--selected");
                }
            }
        }
    }, {
        key: 'renderData',
        value: function renderData(data) {
            this.container.innerHTML = "";

            if (data.length === 0) {
                this.container.innerHTML = "Ничего не найдено";
                return;
            }

            var allDevelopers = data;
            var developersItem = void 0;
            var object = void 0;
            var fragmentObject = void 0;
            var fragmentDeveloper = void 0;

            for (var i = 0; i < allDevelopers.length; i++) {

                var allBlocks = document.createElement("div");
                allBlocks.className = "block";

                for (var y = 0; y < allDevelopers[i].blocks.length; y++) {
                    object = templateObject(allDevelopers[i].blocks[y]);
                    fragmentObject = document.createDocumentFragment();
                    fragmentObject.appendChild(object);
                    allBlocks.appendChild(fragmentObject);
                }

                fragmentDeveloper = document.createDocumentFragment();
                developersItem = templateDeveloper(allDevelopers[i]);
                var blockDiv = developersItem.querySelector(".table__cell--blocks");
                blockDiv.appendChild(allBlocks);

                fragmentObject.appendChild(developersItem);
                this.container.appendChild(fragmentObject);
            }
        }
    }]);

    return View;
}();