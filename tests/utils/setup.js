export function mockLocalStorage() {
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

Object.defineProperty(global, 'localStorage', {
	value: localStorageMock,
	configurable: true
});
}
