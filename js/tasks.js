function addTask(tasks) {
	const addBtn = document.getElementById('add-task-btn');
	// or eventlistener on ENTER in userInput
	addBtn.addEventListener('click',() => {
		const taskInput = document.getElementById('task-input');
		const new_task = taskInput.value.trim();
		if (new_task !== '')
		{
			tasks.push({text: new_task, completed: false, id: crypto.randomUUID()});
			renderTaskList(tasks);
			taskInput.value = '';
			saveTasks(tasks);
		}
	});
}

function removeTask(tasks) {
	const taskList = document.getElementById('task-list');
	taskList.addEventListener('click', (event) => {
		if (event.target.tagName === 'BUTTON' || event.target.tagName === 'IMG')
		{
			const li = event.target.closest('li');
			const taskIdx = tasks.findIndex(t => t.id === li.dataset.idx);
			if (taskIdx > -1)
					tasks.splice(taskIdx, 1);
			renderTaskList(tasks);
			saveTasks(tasks);
		}
	})
}

function enableEditingTask(span) {
	const input = document.createElement('input');
	input.type = 'text';
	input.value = span.textContent;
	input.className = 'text-center';
	span.replaceWith(input);
	input.focus();
	return input;
}

function disableEditingTask(input, tasks, li, initialText) {
	const text = input.value.trim();
	if (text !== '' && input.value !== initialText)
	{
		const taskIdx = tasks.findIndex(t => t.id === li.dataset.idx);
		tasks[taskIdx].text = input.value;
		tasks[taskIdx].completed = false;
	}
}

function handleEditDone(input, tasks, li, initialText) {
	disableEditingTask(input, tasks, li, initialText);
	renderTaskList(tasks);
	saveTasks(tasks);
}

function modifyTask(tasks) {
	const taskList = document.getElementById('task-list');
	taskList.addEventListener('click', (event) => {
		if (event.target.tagName === 'SPAN')
		{
			const li = event.target.closest('li');
			const input = enableEditingTask(event.target);
			input.addEventListener('blur', () => {
				handleEditDone(input, tasks, li, event.target.textContent);
			});
			input.addEventListener('keydown', (e) => {
				if (e.key === 'Enter')
					handleEditDone(input, tasks, li, event.target.textContent);
			});
		}
	})
}

function renderTaskList(tasks)
{
	changeFilterColor();
	const taskList = document.getElementById('task-list');
	taskList.innerHTML = '';
	const filteredList = tasks.filter((task) => shouldDisplayTask(task));
	filteredList.forEach((task) => {
		const li = createTaskElement(task);
		taskList.appendChild(li);
	})
}

function shouldDisplayTask(task)
{
	if (currentFilter === 'completed') return task.completed;
	if (currentFilter === 'active') return !task.completed;
	return true;
}

function createTaskElement(task)
{
	const li = document.createElement('li');
	li.className = 'flex justify-between border-b bg-white p-2';
	li.dataset.idx = task.id;

	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	// console.log(checkbox);
	if (task.completed)
		checkbox.checked = true;

	const span = document.createElement('span');
	span.textContent = task.text;

	const button = document.createElement('button');
	button.className = 'bg-red-300 hover:bg-red-600 rounded-full w-8 h-8 flex justify-center';

	const img = document.createElement('img');
	img.src='assets/trash-solid.svg';
	img.alt='Delete task';
	img.width='15';

	li.appendChild(checkbox);
	li.appendChild(span);
	button.appendChild(img);
	li.appendChild(button);
	return li;
}

function taskToggle(tasks) {
	const taskList = document.getElementById('task-list');
	taskList.addEventListener('click', (event) => {
		if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox')
		{
			const taskIdx = event.target.closest('[data-idx]').dataset.idx;
			const task = tasks.find(t => t.id === taskIdx);
			if (taskIdx === undefined)
				return;
			task.completed = !task.completed;
			renderTaskList(tasks);
			saveTasks(tasks);
		}
	})
}
