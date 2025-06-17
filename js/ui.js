function renderTaskList(tasks)
{
	changeFilterColor();
	const taskList = document.getElementById('task-list');
	taskList.innerHTML = '';
	const filters = {
		completed: task => task.completed,
		active: task => !task.completed,
		all: () => true
	}
	const filteredList = tasks.filter(filters[currentFilter]);
	filteredList.forEach((task) => {
		const li = createTaskElement(task);
		taskList.appendChild(li);
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

function createTaskElement(task)
{
	const li = document.createElement('li');
	li.className = 'flex justify-between border-b bg-white p-2';
	li.dataset.idx = task.id;

	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	if (task.completed)
		checkbox.checked = true;

	const span = document.createElement('span');
	span.textContent = task.text;

	const button = document.createElement('button');
	button.className = 'bg-red-300 hover:bg-red-600 rounded-full w-8 h-8 flex justify-center';

	const img = Object.assign(document.createElement('img'), {
		src: 'assets/trash-solid.svg',
		alt: 'Delete task',
		width: 15
	});

	li.appendChild(checkbox);
	li.appendChild(span);
	button.appendChild(img);
	li.appendChild(button);
	return li;
}

