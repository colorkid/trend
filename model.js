//сниппеты от https://30secondsofcode.org/
const minN = (arr, n = 1) => [...arr].sort((a, b) => a - b).slice(0, n);
const maxN = (arr, n = 1) => [...arr].sort((a, b) => b - a).slice(0, n);

const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
        arr.splice(arr.indexOf(val), 1);
        return acc.concat(val);
      }, [])
    : [];

export default class Model {

    constructor(data) {
      this.data = data;
      // не нужно в модели, см. комментарии Controller#callDeleteAllButton
      this.favoritesIndexArr = [];
      // не нужно вообще, это одна из форм this.data, видимо.
      this.favoritesData = [];
    }

    // не нужен, см. выше
    cleanFavoritesData(data) {
      this.favoritesIndexArr = [];
      this.favoritesData = [];

      // никогда (!!!) не используй for(;;), если есть возможность обойтись без него. 
      // for слишком низкоуровневый, сложно читается и легко позволяет допустить ошибки. 
      // для массивов есть куча прекрасных методов, позволяющих писать лаконично и ясно.
      for(let i = 0; i < this.data.length; i++){
        this.data[i].dataFavorites = false;
      }
    }

    // не нужен, см. выше
    addIndexItem(data) {
      let dataWithIndex = [];

      for(let i = 0; i < data.length; i++){
        data[i].dataIndex = i;
        data[i].dataFavorites = false;
        dataWithIndex.push(data[i]);
      }

      return dataWithIndex;
    }

    // не нужен, см. выше
    addFavoritesItem(indexItem) {
      this.favoritesIndexArr.push(+indexItem);
      this.createFavoritesData(this.favoritesIndexArr);
    }

    // не нужен, см. выше
    removeFavoritesItem(indexItem) {
      remove(this.favoritesIndexArr, n => n === +indexItem);
      this.createFavoritesData(this.favoritesIndexArr);
    }

    createFavoritesData(favoritesIndexArr) {
      this.favoritesData = [];

      for(let i = 0; i < this.data.length; i++){

        this.data[i].dataFavorites = false;

        for(let j = 0; j < favoritesIndexArr.length; j++){

          if(this.data[i].dataIndex === favoritesIndexArr[j]) {
            this.data[i].dataFavorites = true;
            this.favoritesData.push(this.data[i]);
          }
         
        }

      }

      this._upGradeDataFunctionStateOfFavorites();
    }

    _upGradeDataFunctionStateOfFavorites() {
      return this.data;
    }

    // статичный метод
    // не хватает return 0 в конце, вроде как оно будет оптимальнее
    // можно переписать под тернарник, это будет лучше, чем два if-а и оба без скобочек
    _fromLowToHight(a, b) {
      if (a[0] > b[0]) return 1;
      if (a[0] < b[0]) return -1;
    }

    _fromHightToLow(a, b) {
      if (a[0] < b[0]) return 1;
      if (a[0] > b[0]) return -1;
    }

    // тут вообще что-то не понятное, не только в плане кода, а в плане тз.
    _sorting(upGradeData, sortValue) {
      let plansPercentOneDeveloper = [];
    
      for(let i = 0; i < upGradeData.length; i++){
        let plansPercentOneObject = [];

        for(let j = 0; j < upGradeData[i].blocks.length; j++){
          plansPercentOneObject.push(parseFloat([upGradeData[i].blocks[j].blockPlanPercent]));
        }

        if(sortValue === "fromLowToHight") {
          plansPercentOneDeveloper.push([minN(plansPercentOneObject)[0], i]);
          // сортировка проводится на каждой итерации, хотя нужна одна, после for
          plansPercentOneDeveloper.sort(this._fromLowToHight);
        }

        else if(sortValue === "fromHightToLow") {
          plansPercentOneDeveloper.push([maxN(plansPercentOneObject)[0], i]);
          // сортировка проводится на каждой итерации, хотя нужна одна, после for
          plansPercentOneDeveloper.sort(this._fromHightToLow);
        }

        else {
          plansPercentOneDeveloper.push([plansPercentOneObject[0], i]);
        }
      }

      //возвращаем созданный отсортированный массив
      return this._createdSortedArr(plansPercentOneDeveloper, upGradeData);
    }

    // что-то страшное (
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

      // плохо ограничивать модель по работе с данными, это вполне может сделать и контроллер.
      if(valueSearch.length < numberForStart) {
        return this._sorting(this.data, sortValue); 
      }

      let upGradeData = [];
      let simbolsForSearch = valueSearch.toUpperCase();

      for(let i = 0; i < this.data.length; i++){
        
        //ищем по названию завтройщика
        // не используй indexOf !== -1 для проверки вхождения подстроки в строку, это плохо читается.
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