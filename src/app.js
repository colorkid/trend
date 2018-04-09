/*import Controller from './Controller.js';*/

function startApp() {
  let request = new XMLHttpRequest();
  request.open('GET', 'data.json', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      new Controller(JSON.parse(request.responseText));
    
    } else {
      request.onerror();
    }
  };

  request.onerror = function(err) {
    console.log(err.name);
    console.log(err.message);
    console.log(err.stack);
  };

  request.send();
}

document.addEventListener("DOMContentLoaded", startApp);