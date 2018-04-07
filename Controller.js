import View from './view.js';
import Model from './model.js';

class Controller {

    constructor(data) {
      // метод не только сканирует локал сторадж на наличие данных, но и делает кучу побочных действий:
      // создаёт модель
      // заполянет данные, если их не было в сторадже.
      // метод нужно переименовать, чтобы он лучше отвечал тому, что он делает.

      // Кстати, а на кой черт вообще использовать старые, неактуальные данные из локал стораджа,
      // если на момент инициализации контроллера у тебя _уже_ загружены новые?
      // Получается, что у тебя приложение имеет хардкорный кэш, и его никак не сбросить,
      // не имя навыка работы с дев тулз и не зная строения приложения. Никакой F5 не поможет...
      this.scanLocalStorageData(data);

      this.valueSearch = "";
      // не надо так делать, undefined !== "undefined".
      this.sort = "undefined";
      // нет смысла хранить это число внутри this, это больше походит на static-свойство (Controller.numberForStartSearch)
      this.numberForStartSearch = 3;
      // Названия методов у View лучше поправить clickOnSort => setOnClickSort, keyUpOnSearch => setOnKeyUpSearch, чтобы они были более говорящими.
      // А ещё лучше, если обработчики не нужно менять на ходу (а это очень маловероятно), сделать их параметрами конструктора:
      // this.view = new View({
      //   onKeyUpSearch: this.enterCharacters.bind(this),
      //   onClickSort: this.sorting.bind(this),
      // });

      // функции (методы в том числе), которые используются как обработчики событий, принято называть с handle:
      // this.enterCharacters => this.handleSearch
      // this.sorting => this.handleSort
      this.view = new View();
      this.view.keyUpOnSearch(this.enterCharacters.bind(this));
      this.view.clickOnSort(this.sorting.bind(this));
       // сложно было разобраться, зачем. как view будет вешать обработчик, нам не особо важно, но с точки зрения 
       // контроллера тут явно должно быть this.view.clickOnLikeButton(this.callClickOnLikeButton.bind(this));
      this.view.clickOnContainer(this.callClickOnContainer.bind(this));
      this.view.clickOnFavoriteButton(this.callFavoriteButton.bind(this));
      this.view.clickOnAllButton(this.callAllButton.bind(this));
      this.view.clickOnDeleteAllButton(this.callDeleteAllButton.bind(this));
      this._renderNewData(this.numberForStartSearch);
    }

    scanLocalStorageData(data) {
      // объявление лишней переменной, вместо этого можно использовать деструктуризацию параметра: scanLocalStorageData({data: dataForStart})
      let dataForStart = data.data;
      // объявление лишних переменных, они вполне себе const, причём сугубо в ветке if
      let fromLocalFavoritesData = [];
      let fromLocalfavoritesIndexArr = [];

      // никогда не стоит полагаться на то, что localStorage сработает как надо. тут куча потенциальных дыр:
      // а) localStorage недоступен (https://stackoverflow.com/questions/14555347/)
      // б) в localStorage "битые" данные
      // в) dataLocal ок, а остальные отсутствуют или "битые"

      // есть дублирование кода, это проблема.

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

      // по поводу хранения в локалсторадже: для основных данных оно в данном случае не нужно. как его использовать? пара вариантов:
      // а) убрать подгрузку данных и начинать приложение с получения данных с локалстораджа, и добавить кнопку "сбросить кэш", которая уже будет фетчить data.json
      // б) пробовать использовать данные из стораджа только в том случае, если данные не были загружены (catсh у fetch-а)
      // но имхо, это всё лишнее. Единственное, что действительно важно хранить в сторадже, это идентификаторы застройщиков, находящихся в избранном. индексы хранить не нужно, 
      // так как они сменятся при изменении данных (например, удален первый застройщик). В идеале - id, т.к. его нет, то builderName.
      // (!!!) важно подумать, как именно хранить идендификаторы "избранного" в объекте и в локалсторадже (подсказка: это будут разные типы данных)
    }

    setLocalStorageData() {
      this.model.createFavoritesData(this.model.favoritesIndexArr);

      let serialLocalStorageData = JSON.stringify(this.model.data);
      localStorage.setItem('dataLocal', serialLocalStorageData);

      let serialLocalStorageFavoritesData = JSON.stringify(this.model.favoritesData);
      localStorage.setItem('favoritesData', serialLocalStorageFavoritesData);

      let serialLocalStorageFavoritesIndexArr = JSON.stringify(this.model.favoritesIndexArr);
      localStorage.setItem('favoritesIndexArr', serialLocalStorageFavoritesIndexArr);
    }

    callDeleteAllButton() {
      // имхо модель в данном случае вообще может не знать об избранных, удобнее хранить это в контроллере. если данные об избранности нужны в модели, можно передать их дополнительно. Но это явно отдельная сущность, а не признак в существующих данных, так гораздо проще с ними работать
      this.model.cleanFavoritesData(this.dataFromModelToView);
      this.view.renderData(this.model.favoritesData);
      this.dataFromModelToView = this.model.data;
      // жестоко :с
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

    // addRemove => toggle
    // метод не должен зависеть от eventTarget и contains. тут уже должен быть конкретный идентификатор застройщика (напоминаю, это название в твоем случае)
    _addRemoveInFavorites(eventTarget) {
      if(eventTarget.classList.contains("table__cell--like")){
        this.view.changeStateFavoritesButton(eventTarget);
        this._addOrRemoveInFavorites(eventTarget);
        this.setLocalStorageData();
      }
    }

    // склеить с бывшим _addRemoveInFavorites
    _addOrRemoveInFavorites(eventTarget) {
      let indexItem = eventTarget.dataset.index;
    
      if(!eventTarget.classList.contains("table__cell--on-like")){
        this.model.removeFavoritesItem(indexItem);
        return;
      }

      this.model.addFavoritesItem(indexItem);
    }

    sorting() {
      // const. let нужен очень редко.
      // стоп, а откуда тут переменная event? Попробуй ка открыть своё приложение в Firefox. В хроме оно работает чудом из-за его нестандартного поведения.
      // и да, метод не нужен в view, всю логику из него нужно вынести сюда.
      let valueSort = this.view.valueSort(event);
      this.view.changeClassSort(valueSort);
      this.sort = valueSort;
      this._renderNewData(this.numberForStartSearch);
    }

    enterCharacters() {
      // this.valueSearch = this.view.valueSearch(); - эта строчка как минимум должна быть тут.
      // гораздо лучше же будет, если этот обработчик будет принимать event, а из него будет выниматься event.target.value. 
    	this._renderNewData(this.numberForStartSearch);
    }

    _newDataFromModelToRender(dataFromModelToView) {
    	this.view.renderData(dataFromModelToView);
    }

    // в этот метод всегда передаётся this.numberForStartSearch, зачем? можно взять его из this или Controller (если делать статичным)
    _renderNewData(numberForStartSearch) {
      // this.valueSearch = this.view.valueSearch(); - зачем получать данные по поиску каждый раз, когда рендеришь, даже если они не менялись?
      // см. комментарии к enterCharacters
      this.valueSearch = this.view.valueSearch();

      // вместо передачи лишних данных и нагрузки модели доп проверками по поиску, лучше здесь вычислить значение для поиска и передать его в модель
      // const valueSearch = (this.valueSearch.length < this.numberForStartSearch) ? "" : this.valueSearch;
      // this.dataFromModelToView = this.model.upGradeDataFunction(valueSearch, this.sort);
      this.dataFromModelToView = this.model.upGradeDataFunction(this.valueSearch, this.sort, numberForStartSearch);
      this._newDataFromModelToRender(this.dataFromModelToView);
    }

}

// выделить бы в точку входа типа app.js, потому что это никак не относится к классу контроллера.
function startApp() {
  fetch('data.json')
  /*
    Стрелочные функции позволяют значительно сократить код и сделать его чище (таким образом, повысить читаемость), например, так:

    было
    .then(function(response) {
      return response.json();
    })

    стало
    .then(response => response.json())
  */
    .then(function(response) {
        return response.json();
    }).then(function(data) {
      // неиспользуемая константа :) достаточно new Controller(data)
      //Только при удачной подргузки данных, мы запускаем приложение;
      const controller = new Controller(data);

    }).catch(function(err) {
      // посмотри другие методы объекта console
      console.log(err.name);
      console.log(err.message);
      console.log(err.stack);
      // return тут ничего не делает. вообще.
      return;
    });
}



document.addEventListener("DOMContentLoaded", startApp);
