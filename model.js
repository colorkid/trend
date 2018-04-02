const minN = (arr, n = 1) => [...arr].sort((a, b) => a - b).slice(0, n);
const maxN = (arr, n = 1) => [...arr].sort((a, b) => b - a).slice(0, n);

export default class Model {

    constructor(data) {
      this.data = data;
    }

    _fromLowToHight(a, b) {
      if (a[0] > b[0]) return 1;
      if (a[0] < b[0]) return -1;
    }

    _fromHightToLow(a, b) {
      if (a[0] < b[0]) return 1;
      if (a[0] > b[0]) return -1;
    }

    _sorting(upGradeData, sortValue) {
      let plansPercentOneDeveloper = [];
    
      for(let i = 0; i < upGradeData.length; i++){
        let plansPercentOneObject = [];

        for(let j = 0; j < upGradeData[i].blocks.length; j++){
          plansPercentOneObject.push(parseFloat([upGradeData[i].blocks[j].blockPlanPercent]));
        }

        if(sortValue === "fromLowToHight") {
          plansPercentOneDeveloper.push([minN(plansPercentOneObject)[0], i]);
          plansPercentOneDeveloper.sort(this._fromLowToHight);
        }

        else if(sortValue === "fromHightToLow") {
          plansPercentOneDeveloper.push([maxN(plansPercentOneObject)[0], i]);
          plansPercentOneDeveloper.sort(this._fromHightToLow);
        }

        else {
          plansPercentOneDeveloper.push([plansPercentOneObject[0], i]);
        }
      }

      //возвращаем созданный отсортированный массив
      return this._createdSortedArr(plansPercentOneDeveloper, upGradeData);
    }

    _createdSortedArr(plansPercentOneDeveloper, upGradeData) {
      let indexArr = [];
      let sortedArr = [];

      //получаем массив из отсортированной последовательности 
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

      if(valueSearch.length < numberForStart) {
        return this._sorting(this.data, sortValue); 
      }

      let upGradeData = [];
      let simbolsForSearch = valueSearch.toUpperCase();

      for(let i = 0; i < this.data.length; i++){
        
        //ищем по названию завтройщика
        if(this.data[i].builderName.toUpperCase().indexOf(simbolsForSearch) !== -1){
          upGradeData.push(this.data[i]);
              
          continue;
        }

        //ищем по названию объекта(block'а)
        for(let j = 0; j < this.data[i].blocks.length; j++){

          if(this.data[i].blocks[j].blockName.toUpperCase().indexOf(simbolsForSearch) !== -1){
            upGradeData.push(this.data[i]);
          }
              
        }
      }

      //приводим массив в соответсвии с сортировкой
      upGradeData = this._sorting(upGradeData, sortValue);      

      return upGradeData;
    }

}