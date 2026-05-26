import type { Category } from './category';

export type Product = {
    id: number;
    name: string;
    description: string;
    category: Category;
    price: number;
    hasPromo: boolean;
};
