function handleSearch() {
	const searchForm = document.querySelector('.search-form');
	searchForm.addEventListener('submit', (event) => {
		event.preventDefault();
	});

	const searchBar = searchForm.querySelector('#search');
	searchBar.addEventListener('input', (event) => {
		const taskLi = document.querySelectorAll('li');
		const input = normalizeText(event.target.value);
		applySearchFilter(taskLi, input);
	});

	const deleteSearchBtn = searchForm.querySelector('.delete-search');
	deleteSearchBtn.addEventListener('click', () => {
		searchBar.value = '';
		const taskLi = document.querySelectorAll('li');
		taskLi.forEach((task) => {
			task.classList.remove('hidden');
		})
		showSearchMsg(null);
	})
}

function applySearchFilter(taskLi, input)
{
	taskLi.forEach((task) => {
		taskText = normalizeText(task.textContent);
		if (taskText.includes(input))
			task.classList.remove('hidden');
		else
		task.classList.add('hidden');
	});
	if (!input)
		showSearchMsg(null);
	else
	{
		const visibleList = Array.from(taskLi).filter((task) => !task.classList.contains('hidden'));
		showSearchMsg(visibleList);
	}
}

function normalizeText(text) {
	return text
	.toLowerCase()
	.normalize('NFD')
	.replace(/[\u0300-\u036f]/g, '')
	.replace(/\s+/g, '');
}
