function saveTasks(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
	const saved = localStorage.getItem('tasks');
	if (saved)
		return JSON.parse(saved);
	return [];
}

function saveHistory() {
	localStorage.setItem('history', JSON.stringify(history));
}

function loadHistory() {
	const saved = localStorage.getItem('history');
	if (saved)
		return JSON.parse(saved);
	return [];
}
