import templateDeveloper from './templateDeveloper.js';
import templateObject from './templateObject.js';

export default function renderData(data) {
    const container = document.querySelector("#container");
    container.innerHTML = "";

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
        container.appendChild(fragmentObject);
    }



}