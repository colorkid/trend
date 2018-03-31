export default function templateDeveloper (developer, allBlocks) {
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