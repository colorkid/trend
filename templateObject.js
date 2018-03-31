export default function templateObject(objects) {
    let object = document.createElement("div");
    object.className = "block__item";

    object.innerHTML = `
		<div class="block__names"><span>Объект</span>: ${objects.blockName}</div>
		<div class="block__percent block__percent--plan"><span>Планируемый %</span>: ${objects.blockPlanPercent}</div>
		<div class="block__percent block__percent--priority"><span>Приоритетный %</span>: ${objects.blockPriorityPercent}</div>
		<div class="block__percent block__percent--min-max"><span>Min/Max %</span>: ${objects.blockMinMaxPercent}</div>
		<div class="block__percent block__percent--reward"><span>Награждаемый %</span>: ${objects.blockRewardPercent}</div>
    `;

    return object;
}