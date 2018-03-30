export default class View {

    constructor(data) {
    	this.container = document.querySelector("#container");
    	this.search = document.querySelector("#search");

      	this.renderData(data);
    }

    keyUpOnSearch(enterCharacters) {
    	search.addEventListener("keyup", enterCharacters, this.valueSearch);
    }

    valueSearch() {
		return search.value;
    }

    _templateDeveloper(developer, allBlocks) {
    	let row = document.createElement("div");
    	row.className = "table__row";

    	row.innerHTML = `
    		<div class="table__cell table__cell--builder">${developer.builderName}</div>
    		<div class="table__cell table__cell--blocks"></div>
   			<div class="table__cell table__cell--marketing">${developer.builderAdverticement}</div>
   			`;

   			let blockDiv = row.querySelector(".table__cell--blocks");
   		    blockDiv.appendChild(allBlocks);

   		return row;
    }

    _templateBlocks(bloks) {
    	let block = document.createElement("div");
    	block.className = "block__item";

    	block.innerHTML = `
			<div class="block__names"><span>Объект</span>: ${bloks.blockName}</div>
			<div class="block__percent block__percent--plan"><span>Планируемый %</span>: ${bloks.blockPlanPercent}</div>
			<div class="block__percent block__percent--priority"><span>Приоритетный %</span>: ${bloks.blockPriorityPercent}</div>
			<div class="block__percent block__percent--min-max"><span>Min/Max %</span>: ${bloks.blockMinMaxPercent}</div>
			<div class="block__percent block__percent--reward"><span>Награждаемый %</span>: ${bloks.blockRewardPercent}</div>
    	`;

    	return block;
    }

    renderData(data) {
    	this.container.innerHTML = "";

    	if(data.length === 0) return; // - если комбинация символов в search ненайдена

    	let allDevelopers = data;
    	let developersItem;
    	let block;

    	for(let i = 0; i < allDevelopers.length; i++){
    		
    		let allBlocks = document.createElement("div");
    		allBlocks.className = "block";

    		//внутри массива может быть подмассив
    		for(let y = 0; y < allDevelopers[i].blocks.length; y++){
    			block = this._templateBlocks(allDevelopers[i].blocks[y]);
    			allBlocks.appendChild(block);
    		}
    	    
    	    developersItem = this._templateDeveloper(allDevelopers[i], allBlocks);
    		this.container.appendChild(developersItem);

    	} 

    }

}