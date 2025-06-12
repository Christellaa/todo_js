window.addEventListener('DOMContentLoaded', () => {
	const tasks = [];

	const task_list = document.getElementById('task-list');
	const user_input = document.getElementById('task-input');
	const add_btn = document.getElementById('add-task-btn');
	add_btn.addEventListener('click', function() {
		const new_task = user_input.value.trim();
		if (new_task == '')
			return;
		tasks.push(new_task);
		showTaskList();
		// console.log('new task: ', new_task);
	})
	function showTaskList()
	{
		task_list.innerHTML = '';
		tasks.forEach((task) => {
			const li = document.createElement('li');
			li.textContent = task;
			li.className = '';
			task_list.appendChild(li);
		})
	}
})

/*
- on click: get user input on text field
- add input to task list !don't forget to show task list in html!
- 
*/
