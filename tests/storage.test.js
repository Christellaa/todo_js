import { saveTasks, loadTasks, saveHistory, loadHistory } from '../js/storage.js';

// describe = regrouper tests liés ensemble
// beforeEach = fonction qui s'exécute avant chaque test du bloc `describe`
// test / it = definit un test individuel
// expect = fait une assertion (verif si un resultat est ce qu'on attend)
// toEqual = compare 2 objets/tableaux
// toBe = comparer 2 valeurs primitives

const localStorageMock = (() => {
	let storage = {};
	return {
		getItem(key) {
			return storage[key] || null;
		},
		setItem(key, value) {
			storage[key] = value.toString();
		},
		removeItem(key) {
			delete storage[key];
		},
		clear() {
			storage = {};
		}
	};
})(); // () = auto exec

console.log(localStorageMock);

Object.defineProperty(global, 'localStorage', {
	value: localStorageMock,
});

describe('localStorage task functions save and load', () => {
	beforeEach(() => {
		localStorage.clear();
	});
	test('saveTask and loadTasks work correctly', () => {
		tasks = [{id: 'abcd-12', text: 'taskTest', completed: false}];
		saveTasks(tasks);
		const loaded = loadTasks();
		expect(loaded).toEqual(tasks);
	});
	test('loadTasks returns a proper array when something is saved', () => {
		tasks = [{id: 'ab', text: 'test', completed: true}];
		saveTasks(tasks);
		const loaded = loadTasks();
		expect(Array.isArray(loaded)).toBe(true);
	});
	test('loadTasks returns [] if nothing saved', () => {
		const loaded = loadTasks();
		expect(loaded).toEqual([]);
	});
	test('loadTasks returns the correct structure', () => {
		tasks = [{id: 'ab', text: 'test', completed: false}];
		saveTasks(tasks);
		const loaded = loadTasks();
		loaded.forEach(task => {
			expect(task).toHaveProperty('id');
			expect(task).toHaveProperty('text');
			expect(task).toHaveProperty('completed');
		});
	});
	test('Save and load tasks with empty array', () => {
		saveTasks([]);
		const loaded = loadTasks();
		expect(loaded).toEqual([]);
	});
	test('loadTasks handles corrupted data', () => {
		localStorage.setItem('tasks', 'not a json');
		const loaded = loadTasks();
		expect(loaded).toEqual([]);
	});
});

describe('localStorage history functions save and load', () => {
	beforeEach(() => {
		localStorage.clear();
	});
	test('saveHistory and loadHistory work correctly', () => {
		history = [{type: 'add', id: 'abcd-12', text: 'historyTest', completed: true, idx: 5, oldIdx: null}];
		saveHistory(history);
		const loaded = loadHistory();
		expect(loaded).toEqual(history);
	});
	test('loadHistory returns a proper array when something is saved', () => {
		history = [{type: 'add', id: 'abcd-12', text: 'historyTest', completed: true, idx: 5, oldIdx: null}];
		saveHistory(history);
		const loaded = loadHistory();
		expect(Array.isArray(loaded)).toBe(true);
	});
	test('loadHistory returns [] if nothing saved', () => {
		const loaded = loadHistory();
		expect(loaded).toEqual([]);
	});
	test('loadHistory returns the correct structure', () => {
		history = [{type: 'move', id: 'abc', text: 'test', completed: false, idx: '5', oldIdx: '7'}];
		saveHistory(history);
		const loaded = loadHistory();
		loaded.forEach(action => {
			expect(action).toHaveProperty('type');
			expect(action).toHaveProperty('id');
			expect(action).toHaveProperty('text');
			expect(action).toHaveProperty('completed');
			expect(action).toHaveProperty('idx');
			expect(action).toHaveProperty('oldIdx');
		});
	});
	test('Save and load history with empty array', () => {
		saveHistory([]);
		const loaded = loadHistory();
		expect(loaded).toEqual([]);
	});
	test('loadHistory handles corrupted data', () => {
		localStorage.setItem('history', 'not a json');
		const loaded = loadHistory();
		expect(loaded).toEqual([]);
	});
})
