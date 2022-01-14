import type { Product } from './Product';

export type CartItem = {
	product_id: number;
	quantity: number;
	product: Product;
};
