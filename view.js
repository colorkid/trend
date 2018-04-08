import templateDeveloper from './templateDeveloper.js';
import templateObject from './templateObject.js';

export default class View {

    constructor(handlers) {
        this.container = document.querySelector("#container");
        this.arrowsWrapper = document.querySelector(".arrows");
        this.arrows = document.querySelectorAll(".arrow");
        this.search = document.querySelector("#search");
        this.favoriteButton = document.querySelector("#favorites-button");
        this.allButton = document.querySelector("#all-button");
        this.deleteAllButton = document.querySelector("#delete-all");

        for (let i = 0; i < this.arrows.length; i++) { 
            this.arrows[i].addEventListener("click", handlers.onClickSort); 
        }

        this.search.addEventListener("keyup", handlers.onKeyUpSearch);
        this.container.addEventListener("click", handlers.onClickAddFavoriteButton);
        this.favoriteButton.addEventListener("click", handlers.onClickShowFavoriteItemsButton);
        this.allButton.addEventListener("click", handlers.onClickAllButton);
        this.deleteAllButton.addEventListener("click", handlers.onClickOnDeleteAllButton);
    }

    diplayUi(state) {
        if(state === "enable") {
            this.search.removeAttribute("disabled");
            this.arrowsWrapper.classList.remove("arrows--disabled");
            this.deleteAllButton.classList.remove("button--show");
            return;
        }

        this.search.setAttribute("disabled", "true");
        this.arrowsWrapper.classList.add("arrows--disabled");
        this.deleteAllButton.classList.add("button--show");
    }

    showHideDeleteAllButton(state) {
        this.deleteAllButton.classList.remove("button--show");
    }

    changeStateFavoritesButton(buttonFavorites) {
        if(buttonFavorites.classList.contains("table__cell--on-like")){
            buttonFavorites.innerHTML = "Добавить в избранное";
            buttonFavorites.classList.remove("table__cell--on-like");
            return;
        }

        buttonFavorites.innerHTML = "Убрать из изрбанного";
        buttonFavorites.classList.add("table__cell--on-like");
    }

    changeClassSort(value) {
        
        for (let i = 0; i < this.arrows.length; i++) {

            if(this.arrows[i].dataset.arrow === value && !this.arrows[i].classList.contains("arrow--selected")) {
                this.arrows[i].classList.add("arrow--selected");
            }

            else {
                this.arrows[i].classList.remove("arrow--selected");
            }

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