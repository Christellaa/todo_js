let currentFilter = 'all';

function launchTodo() {
	let tasks = loadTasks();

	renderTaskList(tasks);
	taskHandlers(tasks);
}

launchTodo();

/**
 * EASY:
 * reorder tasks with drag and drop (dragstart, dragover, drop => events)
 * MEDIUM:
 * progressor indicator that show 'numberDone/numberMax completed'
 * search bar to search task by text
 * undo last action: by having a history stack of user actions to allow undo
 * HARD:
 * add tests with jest
 * sync with cloud (with api or firebase): to save tasks to it instead of localstorage
 * multi-list: differents lists => work, groceries...
 * user accounts & authentication (need backend): login/register, sync tasks per user
 */

// rename filterList et filterTasks (logic.js et ui.js)
// rename handleEvent (logic.js)
