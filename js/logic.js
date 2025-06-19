function handleProgressBar(tasks) {
	const completedTasks = tasks.filter(task => task.completed);
	const percentage = Math.round((completedTasks.length / tasks.length) * 100);
	updateProgressBar(percentage);
}

function taskHandlers(tasks) {
	switchFilter(tasks);
	const newTaskInput = document.getElementById('task-input');
	const newTaskBtn = document.getElementById('add-task-btn');
	const taskList = document.getElementById('task-list');
	const removeCompleted = document.getElementById('remove-completed');

	newTaskInput.addEventListener('keydown', (event) => event.key === 'Enter' && addNewTask(tasks, newTaskInput));
	newTaskBtn.addEventListener('click',() => addNewTask(tasks, newTaskInput));

	taskList.addEventListener('click', (event) => modifyTask(event.target, tasks));

	handleDragAndDrop(tasks, taskList);

	removeCompleted.addEventListener('click', () => removeCompletedTasks(tasks));
}

function switchFilter(tasks) {
	const filterBtns = document.querySelectorAll('button[data-filter]')
	filterBtns.forEach((btn) => {
		btn.addEventListener('click', () => {
			currentFilter = btn.dataset.filter;
			renderTaskList(tasks, btn.dataset.filter);
		})
	})
}

function modifyTask(target, tasks) {
	const li = target.closest('li');
	if (!li)
		return;
	const task = tasks.find(t => t.id === li.dataset.idx);
	const taskIdx = tasks.findIndex(t => t.id === li.dataset.idx);

	if (target.closest('.delete-btn'))
	{
		saveAction('delete', task.id, task.text, task.completed, taskIdx, null);
		tasks.splice(taskIdx, 1);
		update(tasks);
	}
	else if (target.tagName === 'SPAN')
	{
		const input = enableEditingTask(target);
		input.addEventListener('blur', () => disableEditingTask(input, tasks, taskIdx, target.textContent));
		input.addEventListener('keydown', (event) => event.key === 'Enter' && disableEditingTask(input, tasks, taskIdx, target.textContent));
	}
	else if (target.tagName === 'INPUT' && target.type === 'checkbox')
	{
		saveAction('complete', null, null, task.completed, taskIdx, null);
		task.completed = !task.completed;
		update(tasks);
	}
}

function removeCompletedTasks(tasks) {
	const activeTasks = tasks.filter(task => !task.completed);
	tasks.length = 0;
	tasks.push(...activeTasks);
	update(tasks);
}

function update(tasks) {
	renderTaskList(tasks);
	saveTasks(tasks);
}

function addNewTask(tasks, newTaskInput) {
	const newTaskText = newTaskInput.value.trim();
	if (newTaskText !== '')
	{
		const newTask = {
			id: crypto.randomUUID(),
			text: newTaskText,
			completed: false
		};
		tasks.push(newTask);
		saveAction('add', null, null, null, tasks.length - 1, null);
		update(tasks);
		newTaskInput.value = '';
	}
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

function disableEditingTask(input, tasks, taskIdx, initialText) {
	const newText = input.value.trim();
	if (newText !== '' && input.value !== initialText)
	{
		saveAction('change', null, initialText, tasks[taskIdx].completed, taskIdx, null);
		tasks[taskIdx].text = newText;
		tasks[taskIdx].completed = false;
	}
	update(tasks);
}
