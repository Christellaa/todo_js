export function saveTasks(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function loadTasks() {
	const saved = localStorage.getItem('tasks');
	if (!saved)
		return [];

	try {
		const data = JSON.parse(saved);
		if (!Array.isArray(data)) {
			console.warn('Corrupted data: expected an array');
			localStorage.removeItem('tasks');
			return [];
		}
		const validTasks = data.filter(task =>
			task &&
			typeof task.id === 'string' &&
			typeof task.text === 'string' &&
			typeof task.completed === 'boolean'
		);
		if (validTasks.length !== data.length)
		{
			console.warn('Some corrupted tasks were ignored');
			return [];
		}
		return validTasks;
	} catch (error) {
		console.warn('Error while parsing JSON:', error);
		localStorage.removeItem('tasks');
		return [];
	}
}

export function saveHistory(history) {
	localStorage.setItem('history', JSON.stringify(history));
}

export function loadHistory() {
	const saved = localStorage.getItem('history');
	if (!saved)
		return [];

	try {
		const data = JSON.parse(saved);
		if (!Array.isArray(data)) {
			console.warn('Corrupted data: expected an array');
			localStorage.removeItem('history');
			return [];
		}
		const validHistory = data.filter(action =>
			action &&
			typeof action.type === 'string' &&
			typeof action.id === 'string' &&
			typeof action.text === 'string' &&
			typeof action.completed === 'boolean' &&
			typeof action.idx === 'string' &&
			typeof action.oldIdx === 'string'
		);
		if (validHistory.length !== data.length)
		{
			console.warn('Some corrupted history were ignored');
			return [];
		}
		return validHistory;
	} catch (error) {
		console.warn('Error while parsing JSON:', error);
		localStorage.removeItem('history');
		return [];
	}
}
