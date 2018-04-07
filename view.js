import templateDeveloper from './templateDeveloper.js';
import templateObject from './templateObject.js';

export default class View {

    constructor() {
        // называй свойства так, чтобы было понятно, что это ссылка на дом объект или нодлист (this.refContainer, this.refsArrows...)
        // если во вьюхе больше ничего нет, то не критично, просто для общего просвещения
        this.container = document.querySelector("#container");
        this.arrowsWrapper = document.querySelector(".arrows");
        this.arrows = document.querySelectorAll(".arrow");
        this.search = document.querySelector("#search");
        this.favoriteButton = document.querySelector("#favorites-button");
        this.allButton = document.querySelector("#all-button");
        this.deleteAllButton = document.querySelector("#delete-all");
    }

    // include и disable не антонимы, лучше enable/disable.
    // а ещё лучше сделать один метод displayUi с параметром state
    includedUi() {
        this.search.removeAttribute("disabled");
        this.arrowsWrapper.classList.remove("arrows--disabled");
    }

    disabledUi() {
        this.search.setAttribute("disabled", "true");
        this.arrowsWrapper.classList.add("arrows--disabled");
    }

    // не нужно, см Controller#constructor
    clickOnDeleteAllButton(callDeleteAllButton) {
        this.deleteAllButton.addEventListener("click", callDeleteAllButton);
    }

    // как вариант displayDeleteAllButton с параметром state
    hideDeleteAllButton() {
        this.deleteAllButton.classList.remove("button--show");
    }

    showDeleteAllButton() {
        this.deleteAllButton.classList.add("button--show");
    }

    // не нужно, см Controller#constructor
    clickOnAllButton(callAllButton) {
        this.allButton.addEventListener("click", callAllButton);
    }

    // не нужно, см Controller#constructor
    clickOnFavoriteButton(callFavoriteButton) {
        this.favoriteButton.addEventListener("click", callFavoriteButton);
    }

    // не нужно, см Controller#constructor
    clickOnContainer(callClickOnContainer) {
        // третий параметр используется не по назначению, оно так не работает.
        this.container.addEventListener("click", callClickOnContainer, this.whatIsEvent);
    }

    // метод ради метода, не нужен
    whatIsEvent(event) {
        return event.target;
    }

    // над этим надо подумать, стоит ли это здесь оставлять. как минимум плохо то, что мы опираемся не на данные, а на разметку.
    changeStateFavoritesButton(buttonFavorites) {
        if(buttonFavorites.classList.contains("table__cell--on-like")){
            // innerHTML очень излишен, есть textContent
            buttonFavorites.innerHTML = "Добавить в избранное";
            buttonFavorites.classList.remove("table__cell--on-like");
            // подход с if { ...; return;} ...anotherCode... имеет место быть только когда мы выходим из метода, когда что-то пошло не так
            // типа if (!param) {return} positiveAction(param);
            // Тут же желательно явно показать что нужно сделать либо это, либо это. if () {} else {}.
            return; 
        }

        buttonFavorites.innerHTML = "Убрать из изрбанного";
        buttonFavorites.classList.add("table__cell--on-like");
    }

    // не нужно, см Controller#constructor
    keyUpOnSearch(enterCharacters) {
        this.search.addEventListener("keyup", enterCharacters, this.valueSearch);
    }

    // getValueSearch, не просто valueSearch.
    // ненужный, вредный метод, см. Controller#enterCharacters. дело вьюхи - отображать данные.
    valueSearch() {
        return this.search.value;
    }

    // не нужно, см Controller#constructor
    clickOnSort(sorting) {
        for (let i = 0; i < this.arrows.length; i++) {
            this.arrows[i].addEventListener("click", sorting, this.valueSort);
        }
    }

    valueSort(event) {
        // если нужно вернуть отсутствие значения, используй null, а не строку.
        if(event.target.classList.contains("arrow--selected")) return "undefined";
        return event.target.dataset.arrow;
    }

    changeClassSort(value) {
        
        for (let i = 0; i < this.arrows.length; i++) {

            // дублирование условий в ифах, вложенный иф тут будет проще читаться, т.к. условия будут гораздо проще
            if(this.arrows[i].dataset.arrow === value && !this.arrows[i].classList.contains("arrow--selected")) {
                this.arrows[i].classList.add("arrow--selected");
            }

            // а если посмотерть на тело условий, то выяснится, что ветка `else if` и не нужна вообще, ибо код выполняется тот же, что и в else
            else if(this.arrows[i].dataset.arrow === value && this.arrows[i].classList.contains("arrow--selected")) {
                this.arrows[i].classList.remove("arrow--selected");
            }

            else {
                this.arrows[i].classList.remove("arrow--selected");
            }
            
            // а если ещё и условия почитать, то выяснится, что тут только одно значащее условие, это this.arrows[i].dataset.arrow === value.
            // итого:
            // if (this.arrows[i].dataset.arrow === value) {
            //     this.arrows[i].classList.add("arrow--selected");
            // } else {
            //     this.arrows[i].classList.remove("arrow--selected");
            // }

            // я бы ещё убрал иф, раз он такой примитивный.
            // const selected = this.arrows[i].dataset.arrow === value;
            // this.arrows[i].classList[selecter ? "add" : "remove"]("arrow--selected");
        }

    }

    renderData(data) {
        this.container.innerHTML = "";

        // - если комбинация символов в search ненайдена
        if(data.length === 0) {
            this.container.innerHTML = "Ничего не найдено";
            return;
        }

        let allDevelopers = data;
        let developersItem;
        let object;
        let fragmentObject;
        let fragmentDeveloper;

        // шаблоны очень сложные, они не должны делать ничего, кроме возврата dom-элемента или разметки.
        // у тебя же они обладают сложными сайд-эффектами. убери оттуда всякие appendChild, тогда, возможно, станет легче читать.

        // большая путаница, кстати, с developers, blocks, builders и objects. Приведи к единообразию, как у тебя сущности называются.

        for(let i = 0; i < allDevelopers.length; i++){
                
            let allBlocks = document.createElement("div");
            allBlocks.className = "block";

            //внутри массива может быть подмассив
            for(let y = 0; y < allDevelopers[i].blocks.length; y++){
                object = templateObject(allDevelopers[i].blocks[y]);
                fragmentObject = document.createDocumentFragment();
                fragmentObject.appendChild(object);
                allBlocks.appendChild(fragmentObject);
            }

            fragmentDeveloper = document.createDocumentFragment();
            developersItem = templateDeveloper(allDevelopers[i], allBlocks);
            fragmentObject.appendChild(developersItem);
            this.container.appendChild(fragmentObject);
        }
        
    }
}