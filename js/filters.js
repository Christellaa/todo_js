function filterTasks(tasks) {
	const filterBtns = document.querySelectorAll('button[data-filter]')
	filterBtns.forEach((btn) => {
		btn.addEventListener('click', () => {
			currentFilter = btn.dataset.filter;
			renderTaskList(tasks, btn.dataset.filter);
		})
	})
}

function changeFilterColor()
{
	const filterBtns = document.querySelectorAll(`button[data-filter]`);
	filterBtns.forEach((btn) => {
		if (btn.dataset.filter === currentFilter)
			btn.classList.add('text-violet-700');
		else
			btn.classList.remove('text-violet-700');
	})
}
