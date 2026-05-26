import { Product } from '../types/product';

export class ApiRepo {
    apiUrl = 'http://localhost:3000/products';

    async getProducts(): Promise<Product[]> {
        const response = await fetch(this.apiUrl);
        if (!response.ok)
            throw new Error(response.status + ' ' + response.statusText);
        return response.json();
    }

    async createProduct(newProduct: Partial<Product>): Promise<Product> {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            body: JSON.stringify(newProduct),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok)
            throw new Error(response.status + ' ' + response.statusText);
        return response.json();
    }

    async updateProduct(
        id: Product['id'],
        updatedProduct: Partial<Product>,
    ): Promise<Product> {
        const finalUrl = `${this.apiUrl}/${id}`;
        const response = await fetch(finalUrl, {
            method: 'PATCH',
            body: JSON.stringify(updatedProduct),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok)
            throw new Error(response.status + ' ' + response.statusText);
        return response.json();
    }

    async deleteProduct(id: Product['id']): Promise<Product[]> {
        const finalUrl = `${this.apiUrl}/${id}`;
        const response = await fetch(finalUrl, {
            method: 'DELETE',
        });
        if (!response.ok)
            throw new Error(response.status + ' ' + response.statusText);
        return response.json();
    }
}
