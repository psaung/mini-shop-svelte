import { browser } from '$app/env';
import { writable } from 'svelte/store';

const defaultValue = 'light';
const initialValue = browser ? window.localStorage.getItem('theme') ?? defaultValue : defaultValue;

const theme = writable<string>(initialValue);

theme.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('theme', value);
		if (value === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
});

export { theme as default };
