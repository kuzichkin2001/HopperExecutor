const formButtons = document.getElementsByClassName('hopper-commands__action-btn');

for (let item of formButtons) {
	item.addEventListener('click', event => {
		event.preventDefault();
	})
}