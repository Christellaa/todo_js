let currentFilter = 'all';

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
