import type { Product } from './Product';

export type CartItem = {
	product_id: number;
	product_price?: number;
	quantity: number;
	product: Product;
};
