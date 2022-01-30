import { writable } from 'svelte/store';

const initialValue = 'light';

const theme = writable<string>(initialValue);

export { theme as default };
