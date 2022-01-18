import { writable } from 'svelte/store';
import { findIndex } from 'lodash';
import { browser } from '$app/env';
import type { CartItem } from '../types/Cart';
import type { Product } from '../types/Product';

const defaultValue: CartItem[] = [];
const initialValue = browser
	? JSON.parse(window.localStorage.getItem('cart')) ?? defaultValue
	: defaultValue;

const cart = writable<CartItem[]>(initialValue);

export const emptyCart = () => cart.update(() => []);

export const addOne = (product: Product): boolean => {
	cart.update((c) => {
		const index = findIndex(c, { product_id: product.id });
		if (index >= 0) {
			c.splice(index, 1, { ...c[index], quantity: c[index].quantity + 1 });
			return c;
		}
		return [...c, { product_id: product.id, product, quantity: 1 }];
	});

	return true;
};

export const subtractOne = (product: Product, removeAll = false): boolean => {
	cart.update((c) => {
		const index = findIndex(c, { product_id: product.id });

		if (removeAll || (index >= 0 && c[index].quantity === 1)) {
			return c.filter((item) => item.product_id !== product.id);
		}

		c.splice(index, 1, { ...c[index], quantity: c[index].quantity - 1 });
		return c;
	});
	return true;
};

cart.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('cart', JSON.stringify(value));
	}
});

export { cart as default };
