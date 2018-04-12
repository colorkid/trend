import Controller from './Controller.js';

function startApp() {
	alert("qw");
  fetch('data.json')
    .then(response => response.json())
      .then(function(data) {
        new Controller(data);
    }).catch(
    response => {
      console.log(err.name);
      console.log(err.message);
      console.log(err.stack);
    })
}

document.addEventListener("DOMContentLoaded", startApp);