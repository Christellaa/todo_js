let currentFilter = 'all';

function launchTodo() {
	const tasks = loadTasks();

	renderTaskList(tasks);
	taskHandlers(tasks);
	handleSearch();
}

launchTodo();

/**
 * MEDIUM:
 * undo last action: by having a history stack of user actions to allow undo
 * HARD:
 * add tests with jest
 * sync with cloud (with api or firebase): to save tasks to it instead of localstorage
 * multi-list: differents lists => work, groceries...
 * user accounts & authentication (need backend): login/register, sync tasks per user
 */
