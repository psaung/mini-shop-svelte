import type { CartItem } from './Cart';

export type Order = {
	id?: number;
	uuid?: number;
	firstname: string;
	lastname: string;
	email: string;
	phone: string;
	address: string;
	order_items?: Array<CartItem>;
	total_price?: number;
	subtotal_price?: number;
	vat_calculated_price?: number;
};
