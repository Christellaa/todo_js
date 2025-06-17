let currentFilter = 'all';

function initTodo() {
	const tasks = loadTasks();
	changeFilterColor();
	renderTaskList(tasks);
	filterTasks(tasks);
	addTask(tasks);
	removeTask(tasks);
	modifyTask(tasks);
	taskToggle(tasks);
}

initTodo();
