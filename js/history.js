import { saveHistory, loadHistory } from './storage.js';
import { update } from './logic.js';

const history = loadHistory();

export function saveAction(type, id, text, completed, idx, oldIdx) {
	const action = {type: type, id: id, text: text, completed: completed, idx: idx, oldIdx: oldIdx};
	if (history.length > 4)
		history.shift();
	history.push(action);
	saveHistory(history);
}

export function handleUndo(tasks) {
	const undoBtn = document.querySelector('.undo-action');
	undoBtn.addEventListener('click', () => undoAction(tasks));
}

function undoAction(tasks) {
	const lastAction = history.pop();
	if (!lastAction)
		return;

	switch (lastAction.type) {
		case 'add':
			deleteAction(tasks, lastAction);
			break;
		case 'delete':
			addAction(tasks, lastAction);
			break;
		case 'change':
			changeAction(tasks, lastAction);
			break;
		case 'complete':
			completeAction(tasks, lastAction);
		case 'move':
			moveAction(tasks, lastAction);
		default:
			break;
	}
	update(tasks);
	saveHistory(history);
}

function deleteAction(tasks, action) {
	tasks.splice(action.idx, 1);
}

function addAction(tasks, action) {
	const newTask = {
		id: action.id,
		text: action.text,
		completed: action.completed
	};
	tasks.splice(action.idx, 0, newTask);
}

function changeAction(tasks, action) {
	const task = tasks[action.idx];
	task.text = action.text;
	task.completed = action.completed;
}

function completeAction(tasks, action) {
	const task = tasks[action.idx];
	if (task)
		task.completed = action.completed;
}

function moveAction(tasks, action) {
	const newIdx = action.idx;
	const oldIdx = action.oldIdx;

	const tmp = tasks[newIdx];
	tasks.splice(newIdx, 1);
	tasks.splice(oldIdx, 0, tmp);
}
