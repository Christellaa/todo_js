function addTask(tasks) {
	const addBtn = document.getElementById('add-task-btn');
	addBtn.addEventListener('click',() => {
		const taskInput = document.getElementById('task-input');
		const new_task = taskInput.value.trim();
		if (new_task !== '')
		{
			tasks.push({text: new_task, completed: false, id: nextId++});
			renderTaskList(tasks);
			taskInput.value = '';
			saveTasks(tasks);
			saveNextId(nextId);
		}
	});
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

function createTaskElement(task, idx)
{
	const li = document.createElement('li');
	li.textContent = task.text;
	li.className = 'p-2 bg-white border-b';
	if (task.completed)
		li.classList.add('line-through');
	li.dataset.idx = task.id;
	return li;
}

function taskToggle(tasks) {
	const taskList = document.getElementById('task-list');
	taskList.addEventListener('click', (event) => {
		const taskIdx = event.target.dataset.idx;
		if (taskIdx === undefined)
			return;
		tasks[taskIdx].completed = !tasks[taskIdx].completed;
		renderTaskList(tasks);
		saveTasks(tasks);
	})
}
