import View from './view.js';
import Model from './model.js';

class Controller {

    constructor(data) {
      this.model = new Model();
      this.view = new View(data);
    }
    
}

function startApp() {
  fetch('data.json')
    .then(function(response) { 
        return response.json();
    }).then(function(data) {

      //Только при удачной подргузки данных, мы запускаем приложение;
      const controller = new Controller(data);

    }).catch(function(err) {
      console.log(err.name);
      console.log(err.message);
      console.log(err.stack);
      return;
    });
}

document.addEventListener("DOMContentLoaded", startApp);