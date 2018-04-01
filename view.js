import templateDeveloper from './templateDeveloper.js';
import templateObject from './templateObject.js';
import renderData from './renderData.js';

export default class View {

    constructor(data) {
    	this.arrows = document.querySelectorAll(".arrow");
    	this.search = document.querySelector("#search");
      	
      	renderData(data);
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

}
