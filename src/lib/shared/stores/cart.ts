import { browser } from '$app/env';
import { writable } from 'svelte/store';
import type { CartItem } from '../types/Cart';
import type { Product } from '../types/Product';

const defaultValue: Record<string, CartItem> = {};
const initialValue = browser
	? JSON.parse(window.localStorage.getItem('cart')) ?? defaultValue
	: defaultValue;

const cart = writable<Record<string, CartItem>>(initialValue);

export const addOne = (product: Product): boolean => {
	cart.update((c) => ({
		...c,
		[product.id]: {
			id: product.id,
			quantity: (c?.[product.id]?.quantity || 0) + 1,
			product: product
		}
	}));

	return true;
};

export const subtractOne = (product: Product, removeAll = false): boolean => {
	cart.update(({ [product.id]: p, ...c }) => ({
		...c,
		// if the last quantity is 1, remove the item from the card
		// ...((c?.[product.id]?.quantity === 1 || removeAll) ? {
		...(p.quantity !== 1 &&
			!removeAll && {
				[product.id]: {
					...p,
					quantity: p.quantity - 1
				}
			})
	}));
	return true;
};

cart.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('cart', JSON.stringify(value));
	}
});

export { cart as default };
