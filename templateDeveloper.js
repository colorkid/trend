export default function templateDeveloper (developer, allBlocks) {
  let row = document.createElement("div");
  row.className = "table__row";

  row.innerHTML = `
  	<div class="table__cell table__cell--builder">${developer.builderName}</div>
  	<div class="table__cell table__cell--blocks"></div>
   	<div class="table__cell table__cell--marketing">${developer.builderAdverticement}</div>
    <div class="table__cell table__cell--like ${developer.dataFavorites ? "table__cell table__cell--on-like" : ""}" data-index="${developer.dataIndex}">${developer.dataFavorites ? "Убрать из изрбанного" : "Добавить в избранное"}</div>
   	`;

  let blockDiv = row.querySelector(".table__cell--blocks");
  blockDiv.appendChild(allBlocks);

  return row;
}