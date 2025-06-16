function addTask(tasks) {
	const addBtn = document.getElementById('add-task-btn');
	addBtn.addEventListener('click',() => {
		const taskInput = document.getElementById('task-input');
		const new_task = taskInput.value.trim();
		if (new_task !== '')
		{
			tasks.push({text: new_task, completed: false, id: crypto.randomUUID()});
			renderTaskList(tasks);
			taskInput.value = '';
			saveTasks(tasks);
			// saveNextId(nextId);
		}
	});
}

function removeTask(tasks) {
	const taskList = document.getElementById('task-list');
	// const removeBtn = document.querySelectorAll('remove-btn');
	taskList.addEventListener('click', (event) => {
		const li = event.target.closest('li');
		const btn = event.target.closest('button');
		// console.log(li);
		// console.log(btn);
	})
	// when clicking on trashcan -> .remove on the div of the task
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

	const span = document.createElement('span');
	span.textContent = task.text;
	if (task.completed)
		span.classList.add('line-through');

	const button = document.createElement('button');
	button.className = 'bg-red-300 hover:bg-red-600 rounded-full w-8 h-8 flex justify-center';

	const img = document.createElement('img');
	img.src='assets/trash-solid.svg';
	img.alt='Delete task';
	img.width='15';

	li.appendChild(span);
	button.appendChild(img);
	li.appendChild(button);
	return li;
}

function taskToggle(tasks) {
	const taskList = document.getElementById('task-list');
	taskList.addEventListener('click', (event) => {
		const taskIdx = event.target.closest('[data-idx]').dataset.idx;
		const task = tasks.find(t => t.id === taskIdx);
		console.log(event.target); // donne le span
		console.log(task); // donne la tache de tasks[]
		if (taskIdx === undefined)
			return;
		task.completed = !task.completed;
		renderTaskList(tasks);
		saveTasks(tasks);
	})
}
