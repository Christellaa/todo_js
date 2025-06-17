function saveTasks(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
	const saved = localStorage.getItem('tasks');
	if (saved)
		return JSON.parse(saved);
	return [];
}
