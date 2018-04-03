import templateDeveloper from './templateDeveloper.js';
import templateObject from './templateObject.js';
import renderData from './renderData.js';

export default class View {

    constructor(data) {
    	this.search = document.querySelector("#search");
      	renderData(data);
    }

    keyUpOnSearch(enterCharacters) {
    	search.addEventListener("keyup", enterCharacters, this.valueSearch);
    }

    valueSearch() {
		return search.value;
    }

}