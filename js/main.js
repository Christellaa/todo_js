let currentFilter = 'all';
let nextId = 0;

function initTodo() {
	const tasks = [];
	changeFilterColor();
	filterTasks(tasks);
	addTask(tasks);
	taskToggle(tasks);
}


initTodo();
