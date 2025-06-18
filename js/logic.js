function taskHandlers(tasks) {
	switchFilter(tasks);
	const newTaskInput = document.getElementById('task-input');
	const newTaskBtn = document.getElementById('add-task-btn');
	const taskList = document.getElementById('task-list');
	const removeCompleted = document.getElementById('remove-completed');

	newTaskInput.addEventListener('keydown', (e) => e.key === 'Enter' && addNewTask(tasks, newTaskInput));
	newTaskBtn.addEventListener('click',() => addNewTask(tasks, newTaskInput));

	taskList.addEventListener('click', (event) => modifyTask(event.target, tasks));

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

function modifyTask(span, tasks) {
	const li = span.closest('li');
	const task = tasks.find(t => t.id === li.dataset.idx);
	const taskIdx = tasks.findIndex(t => t.id === li.dataset.idx);

	if (span.tagName === 'BUTTON' || span.tagName === 'IMG')
	{
		tasks.splice(taskIdx, 1);
		update(tasks);
	}
	else if (span.tagName === 'SPAN')
	{
		const input = enableEditingTask(span);
		input.addEventListener('blur', () => disableEditingTask(input, tasks, taskIdx, span.textContent));
		input.addEventListener('keydown', (e) => e.key === 'Enter' && disableEditingTask(input, tasks, taskIdx, span.textContent));
	}
	else if (span.tagName === 'INPUT' && span.type === 'checkbox')
	{
		task.completed = !task.completed;
		update(tasks);
	}
}

function removeCompletedTasks(tasks) {
	const filteredList = tasks.filter(task => !task.completed);
	tasks.length = 0;
	tasks.push(...filteredList);
	update(tasks);
}

function update(tasks) {
	renderTaskList(tasks);
	saveTasks(tasks);
}

function addNewTask(tasks, newTaskInput) {
	const new_task = newTaskInput.value.trim();
	if (new_task !== '')
	{
		tasks.push({id: crypto.randomUUID(), text: new_task, completed: false});
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
		tasks[taskIdx].text = newText;
		tasks[taskIdx].completed = false;
	}
	update(tasks);
}
