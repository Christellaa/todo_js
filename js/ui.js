function renderTaskList(tasks)
{
	changeFilterColor();

	const taskList = document.getElementById('task-list');
	taskList.innerHTML = '';
	const filteredList = filterList(tasks);
	filteredList.forEach((task) => {
		const li = createTaskElement(task);
		taskList.appendChild(li);
	})

	if (currentFilter === 'completed' && filteredList.length > 0)
		document.getElementById('remove-completed').classList.remove('hidden');
	else
		document.getElementById('remove-completed').classList.add('hidden');
}

function filterList(tasks) {
	const filters = {
	completed: task => task.completed,
	active: task => !task.completed,
	all: () => true
	}
	return tasks.filter(filters[currentFilter]);
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
	li.className = 'flex justify-between items-center border-b bg-white p-2';
	li.dataset.idx = task.id;

	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.className = 'mr-5';
	if (task.completed)
		checkbox.checked = true;

	const span = document.createElement('span');
	span.textContent = task.text;
	span.className = 'break-words overflow-hidden';

	const div = document.createElement('div');
	div.className = 'flex ml-3 gap-3';

	const button = document.createElement('button');
	button.className = 'bg-red-300 hover:bg-red-600 rounded-full w-8 h-8 flex justify-center flex-shrink-0';

	const deleteImg = Object.assign(document.createElement('img'), {
		src: 'assets/trash-solid.svg',
		alt: 'Delete task',
		width: 15
	});

	const dragDropImg = Object.assign(document.createElement('img'), {
		src: 'assets/grip-lines-solid.svg',
		alt: 'Drag and drop task',
		width: 15
	});

	li.appendChild(checkbox);
	li.appendChild(span);
	button.appendChild(deleteImg);
	div.appendChild(button);
	div.appendChild(dragDropImg);
	li.appendChild(div);
	return li;
}

