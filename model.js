export default class Model {

    constructor(data) {
  		this.data = data;
    }

    searchModel(valueSearch) {
    	let upGradeData = [];
    	let simbolsForSearch = valueSearch.toUpperCase();

    	for(let i = 0; i < this.data.length; i++){
    		
    		//ищем по названию завтройщика
          	if(this.data[i].builderName.toUpperCase().indexOf(simbolsForSearch) !== -1){
            	upGradeData.push(this.data[i]);
            	
            	continue;
          	}

          	//ищем по названию объекта(block'а)
          	for(var j = 0; j < this.data[i].blocks.length; j++){

          		if(this.data[i].blocks[j].blockName.toUpperCase().indexOf(simbolsForSearch) !== -1){
          	 		upGradeData.push(this.data[i]);
          	 	}
          	 	
          	}
    	}

    	return upGradeData;
    }

}

