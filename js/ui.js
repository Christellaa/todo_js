import { filterState } from './main.js';
import { handleProgressBar } from './logic.js';
import { normalizeText, applySearchFilter } from './search.js';

export function updateProgressBar(percentage)
{
	const text = document.querySelector('.progress-bar-text');
	const width = document.querySelector('.progress-bar-width');
	text.textContent = `${percentage}%`;
	width.style.width = `${percentage}%`;
}

export function showSearchMsg(taskList)
{
	const searchForm = document.querySelector('.search-form');

	const oldSpan = searchForm.querySelector('span');
	if (oldSpan)
		searchForm.removeChild(oldSpan);
	if (!taskList)
		return;

	const span = document.createElement('span');
	span.className = 'text-gray-600';

	if (taskList.length == 0)
		span.textContent = 'No task found';
	else
		span.textContent = `${taskList.length} task${taskList.length > 1 ? 's' : ''} found`;

	searchForm.appendChild(span);
}

export function renderTaskList(tasks)
{
	changeFilterColor();
	handleProgressBar(tasks);
	const taskList = document.getElementById('task-list');
	taskList.innerHTML = '';
	const filteredList = filterList(tasks);
	filteredList.forEach((task) => {
		const li = createTaskElement(task);
		taskList.appendChild(li);
	})

	if (filterState.currentFilter === 'completed' && filteredList.length > 0)
		document.getElementById('remove-completed').classList.remove('hidden');
	else
		document.getElementById('remove-completed').classList.add('hidden');

	const taskLi = document.querySelectorAll('li');
	const searchBar = document.getElementById('search');
	const input = normalizeText(searchBar.value);
	applySearchFilter(taskLi, input);
}

function filterList(tasks) {
	const filters = {
	completed: task => task.completed,
	active: task => !task.completed,
	all: () => true
	}
	return tasks.filter(filters[filterState.currentFilter]);
}


function changeFilterColor()
{
	const filterBtns = document.querySelectorAll(`button[data-filter]`);
	filterBtns.forEach((btn) => {
		if (btn.dataset.filter === filterState.currentFilter)
			btn.classList.add('text-violet-700');
		else
			btn.classList.remove('text-violet-700');
	})
}

function createTaskElement(task)
{
	const li = document.createElement('li');
	li.className = 'flex justify-between items-center border-b bg-white p-2';
	li.dataset.idx = task.id;

	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.className = 'mr-5';
	if (task.completed)
		checkbox.checked = true;

	const span = document.createElement('span');
	span.textContent = task.text;
	span.className = 'break-words overflow-hidden';

	const div = document.createElement('div');
	div.className = 'flex ml-3 gap-3';

	const button = document.createElement('button');
	button.className = 'delete-btn bg-red-300 hover:bg-red-600 rounded-full w-8 h-8 flex justify-center flex-shrink-0';

	const deleteImg = Object.assign(document.createElement('img'), {
		src: 'assets/trash-solid.svg',
		alt: 'Delete task',
		width: 15
	});

	const dragDropImg = Object.assign(document.createElement('img'), {
		src: 'assets/grip-lines-solid.svg',
		alt: 'Drag and drop task',
		className: 'drapDropImg cursor-grab',
		draggable: true,
		width: 15
	});

	li.appendChild(checkbox);
	li.appendChild(span);
	button.appendChild(deleteImg);
	div.appendChild(button);
	div.appendChild(dragDropImg);
	li.appendChild(div);
	return li;
}

