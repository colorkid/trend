//сниппеты от https://30secondsofcode.org/
const minN = (arr, n = 1) => [...arr].sort((a, b) => a - b).slice(0, n);
const maxN = (arr, n = 1) => [...arr].sort((a, b) => b - a).slice(0, n);

/*export default*/ class Model {

    constructor(data, setIdFavoritesFromLocal) {
      this.data = data;
      this.favoritesIdSet = new Set(setIdFavoritesFromLocal);
      this.favoritesData = [];

      Model.fromLowToHight = (a, b) => {
    		return (a[0] > b[0]) ? 1 : -1;
    	}

    	Model.fromHightToLow = (a, b) => {
    		return (a[0] < b[0]) ? 1 : -1;
    	}
    }

    cleanFavoritesData(data) {
    	this.favoritesIdSet = new Set();
    	this.favoritesData = [];

    	for(let i = 0; i < this.data.length; i++){
        	this.data[i].dataFavorites = false;
    	}
    }

    addFavoritesId(id) {
    	this.favoritesIdSet.add(id);
    	this.createFavoritesData();
    }

    removeFavoritesId(id) {
    	this.favoritesIdSet.delete(id);
    	this.createFavoritesData();
    }

    createFavoritesData() {
    	this.favoritesData = [];

    	for(let i = 0; i < this.data.length; i++){

    		this.data[i].dataFavorites = false;

			  this.favoritesIdSet.forEach((id) => {
  				if(this.data[i].builderName === id) {
  					this.data[i].dataFavorites = true;
            this.favoritesData.push(this.data[i]);
  				}
			  });
    	}

    	this._upGradeDataFunctionStateOfFavorites();
    }

    _upGradeDataFunctionStateOfFavorites() {
    	return this.data;
    }

    _sorting(upGradeData, sortValue) {
    	let plansPercentOneDeveloper = [];
    	let directionSort;
    
    	for(let i = 0; i < upGradeData.length; i++){
    		let plansPercentOneObject = [];

        	for(let j = 0; j < upGradeData[i].blocks.length; j++){
         	 plansPercentOneObject.push(parseFloat([upGradeData[i].blocks[j].blockPlanPercent]));
        	}

        	if(sortValue === "fromLowToHight") {
          		plansPercentOneDeveloper.push([minN(plansPercentOneObject)[0], i]);
          		directionSort = Model.fromLowToHight;
        	}

        	else if(sortValue === "fromHightToLow") {
          		plansPercentOneDeveloper.push([maxN(plansPercentOneObject)[0], i]);
          		directionSort = Model.fromHightToLow;
        	}

        	else {
          		plansPercentOneDeveloper.push([plansPercentOneObject[0], i]);
        	}
      	}	

      	//Я тут directionSort каждый раз перезаписываю в цикле, так как там есть if и т.д., нехотелось бы данную конструкцию дублировать ниже
      	plansPercentOneDeveloper.sort(directionSort);

      return this._createdSortedArr(plansPercentOneDeveloper, upGradeData);
    }

    //создаем отсортированный массив sortedArr, беря индекс элементов из plansPercentOneDeveloper и item из upGradeData
    _createdSortedArr(plansPercentOneDeveloper, upGradeData) {
    	let indexArr = [];
    	let sortedArr = [];

    	for(let i = 0; i < plansPercentOneDeveloper.length; i++){
    		indexArr.push(plansPercentOneDeveloper[i][1]);
    	}

    	for(let i = 0; i < indexArr.length; i++){
        sortedArr.push(upGradeData[indexArr[i]]);
      }

      return sortedArr;
    }

    upGradeDataFunction(valueSearch, sort, numberForStart) {
      let sortValue = sort;
      let upGradeData = [];
      let simbolsForSearch = valueSearch.toUpperCase();

      for(let i = 0; i < this.data.length; i++){
        
        if(this.data[i].builderName.toUpperCase().includes(simbolsForSearch)){
          upGradeData.push(this.data[i]);
              
          continue;
        }

        for(let j = 0; j < this.data[i].blocks.length; j++){

          if(this.data[i].blocks[j].blockName.toUpperCase().includes(simbolsForSearch)){
            upGradeData.push(this.data[i]);
          }
              
        }
      }

      upGradeData = this._sorting(upGradeData, sortValue);      

      return upGradeData;
    }

}