let currentFilter = 'all';
// let nextId = loadNextId();

function initTodo() {
	const tasks = loadTasks();
	changeFilterColor();
	renderTaskList(tasks);
	filterTasks(tasks);
	addTask(tasks);
	removeTask(tasks);
	taskToggle(tasks);
}

initTodo();

// localStorage.removeItem('tasks');
// localStorage.removeItem('tasks');
