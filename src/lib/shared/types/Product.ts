import type { Category } from './Category';

export type Product = {
	id: number;
	product_name: string;
	product_description: string;
	product_sku: string;
	product_price: number;
	product_image: string;
	category: Category;
};
