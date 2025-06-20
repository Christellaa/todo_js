import { loadTasks } from './storage.js';
import { renderTaskList } from './ui.js';
import { taskHandlers } from './logic.js';
import { handleSearch } from './search.js';
import { handleUndo } from './history.js';

export const filterState = {
	currentFilter: 'all'
};

function launchTodo() {
	const tasks = loadTasks();

	renderTaskList(tasks);
	taskHandlers(tasks);
	handleSearch();
	handleUndo(tasks);
}

launchTodo();

/**
 * HARD:
 * add tests with jest
 * sync with cloud (with api or firebase): to save tasks to it instead of localstorage
 * multi-list: differents lists => work, groceries...
 * user accounts & authentication (need backend): login/register, sync tasks per user
 */
