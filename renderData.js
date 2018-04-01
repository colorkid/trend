import templateDeveloper from './templateDeveloper.js';
import templateObject from './templateObject.js';

export default function renderData(data, sort) {
    console.log(sort);
    const container = document.querySelector("#container");
    container.innerHTML = "";

    if(data.length === 0) return; // - если комбинация символов в search ненайдена

    let allDevelopers = data;
    let developersItem;
    let object;

    for(let i = 0; i < allDevelopers.length; i++){
    		
    	let allBlocks = document.createElement("div");
    	allBlocks.className = "block";

    	//внутри массива может быть подмассив
    	for(let y = 0; y < allDevelopers[i].blocks.length; y++){
    		object = templateObject(allDevelopers[i].blocks[y]);
    		allBlocks.appendChild(object);
    	}
    	    
    	developersItem = templateDeveloper(allDevelopers[i], allBlocks);
    	container.appendChild(developersItem);

    } 

}