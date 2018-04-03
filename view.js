import templateDeveloper from './templateDeveloper.js';
import templateObject from './templateObject.js';

export default class View {

    constructor(data) {
        this.container = document.querySelector("#container");
    	this.arrows = document.querySelectorAll(".arrow");
    	this.search = document.querySelector("#search");
    }

    clickOnContainer(callClickOnContainer) {
        this.container.addEventListener("click", callClickOnContainer, this.whatIsEvent);
    }

    whatIsEvent(event) {
        return event.target;
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

    keyUpOnSearch(enterCharacters) {
    	this.search.addEventListener("keyup", enterCharacters, this.valueSearch);
    }

    valueSearch() {
		return this.search.value;
    }

    clickOnSort(sorting) {
    	for (let i = 0; i < this.arrows.length; i++) {
    		this.arrows[i].addEventListener("click", sorting, this.valueSort);
    	}
    }

    valueSort(event) {
    	if(event.target.classList.contains("arrow--selected")) return "undefined";
		return event.target.dataset.arrow;
    }

    changeClassSort(value) {
    	
    	for (let i = 0; i < this.arrows.length; i++) {

    		if(this.arrows[i].dataset.arrow === value && !this.arrows[i].classList.contains("arrow--selected")) {
    			this.arrows[i].classList.add("arrow--selected");
    		}

    		else if(this.arrows[i].dataset.arrow === value && this.arrows[i].classList.contains("arrow--selected")) {
    			this.arrows[i].classList.remove("arrow--selected");
    		}

    		else {
    			this.arrows[i].classList.remove("arrow--selected");
    		}

    	}

    }

    renderData(data) {
        this.container.innerHTML = "";

        if(data.length === 0) return; // - если комбинация символов в search ненайдена

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
