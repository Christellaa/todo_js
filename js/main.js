let currentFilter = 'all';
let nextId = loadNextId();

function initTodo() {
	const tasks = loadTasks();
	changeFilterColor();
	renderTaskList(tasks);
	console.log(nextId);
	filterTasks(tasks);
	addTask(tasks);
	taskToggle(tasks);
}

initTodo();
