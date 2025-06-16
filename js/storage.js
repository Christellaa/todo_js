function saveTasks(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
	const saved = localStorage.getItem('tasks');
	if (saved)
		return JSON.parse(saved);
	return [];
}

// function saveNextId(nextId) {
// 	localStorage.setItem('nextId', JSON.stringify(nextId));
// }

// function loadNextId() {
// 	const saved = localStorage.getItem('nextId');
// 	if (saved)
// 		return JSON.parse(saved);
// 	return 0;
// }
