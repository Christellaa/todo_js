let lastHoveredTask = null;

function handleDragAndDrop(tasks, taskList) {
	document.body.addEventListener('dragover', (e) => e.preventDefault());
	taskList.addEventListener('dragstart', dragStartTask);
	taskList.addEventListener('dragover', dragOverTask);
	taskList.addEventListener('dragleave', dragLeaveTask);
	taskList.addEventListener('drop', (event) => dropTask(event, tasks));
}

function dragStartTask(event) {
	if (event.target.tagName != 'IMG' || !event.target.closest('.drapDropImg'))
	{
		event.preventDefault();
		return;
	}
	const img = event.target.closest('.drapDropImg');
	if (!img)
		return;
	const li = img.closest('li');
	if (!li)
		return;
	event.dataTransfer.setData('text/plain', li.dataset.idx);
	console.log('start');
}

function dragOverTask(event) {
	event.preventDefault();
	const li = event.target.closest('li');
	if (!li)
		return;
	if (lastHoveredTask)
		lastHoveredTask.classList.remove('drag-over', 'bg-gray-200');
	li.classList.add('drag-over', 'bg-gray-200');
	lastHoveredTask = li;
	console.log('over');
}

function dragLeaveTask(event) {
	const li = event.target.closest('li');
	if (!li)
		return;
	li.classList.remove('drag-over', 'bg-gray-200');
	console.log('leave');
}

function dropTask(event, tasks) {
	event.preventDefault();
	const li = event.target.closest('li');
	if (!li)
		return;
	li.classList.remove('drag-over', 'bg-gray-200');
	lastHoveredTask = null;

	const fromIdx = event.dataTransfer.getData('text/plain');
	const taskIdxFrom = tasks.findIndex(t => t.id === fromIdx);
	const toIdx = li.dataset.idx;
	const taskIdxTo = tasks.findIndex(t => t.id === toIdx);

	if (taskIdxFrom === -1 || taskIdxTo === -1 || taskIdxFrom === taskIdxTo)
		return;
	swapTasks(taskIdxFrom, taskIdxTo, tasks);
	console.log('drop');
	update(tasks);
}

function swapTasks(fromIdx, toIdx, tasks) {
	const tmp = tasks[fromIdx];
	tasks.splice(fromIdx, 1);
	tasks.splice(toIdx, 0, tmp);
}
