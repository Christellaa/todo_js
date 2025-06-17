function addTask(tasks) {
	const addBtn = document.getElementById('add-task-btn');
	const userInput = document.getElementById('task-input');
	userInput.addEventListener('keydown', (e) => {
		if (e.key === 'Enter')
			handleAddTask(tasks);
	})
	addBtn.addEventListener('click',() => {
		handleAddTask(tasks);
	});
}

function handleAddTask(tasks) {
	const taskInput = document.getElementById('task-input');
	const new_task = taskInput.value.trim();
	if (new_task !== '')
	{
		tasks.push({text: new_task, completed: false, id: crypto.randomUUID()});
		renderTaskList(tasks);
		taskInput.value = '';
		saveTasks(tasks);
	}
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
