import { Category } from '../types/category';
import type { Product } from '../types/product';
import { render } from './base.js';

function setID(products: Product[]) {
    const ids = products.map((product) => product.id);
    const maxID = Math.max(...ids);
    return maxID + 1;
}

export function createFormAdd(
    products: Product[] = [],
    selector: string = 'body',
    position: InsertPosition = 'afterbegin',
) {
    // Function to handle form submission
    function handleSubmit(event: Event) {
        event.preventDefault(); // Prevent the default form submission behavior
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const product: Product = {
            id: setID(products),
            name: data.name as string,
            description: data.description as string,
            category: data.category as Category, // Cast to Category type
            price: parseInt(data.price as string), // Convert age to a number
            hasPromo: data.hasPromo === 'on', // Convert checkbox value to boolean
        };

        console.log('Form submitted:', product); // Log the form data to the console
    }

    const template = /*html*/ `
    <form class="add_form" aria-label="add_form">
        <label>
            <span>Name</span>
            <input type="text" name="name">
        </label>
        <label>
            <span>Description</span>
            <input type="text" name="description">
        </label>
        <label>
            <span>Price</span>
            <input type="number" name="price">
        </label>
        <label>
            <input type="checkbox" name="hasPromo" />
            <span>Esta en promoción</span>
        </label>
        <label>
            <span>Category</span>
            <select name="category" id="category">
                <option value="" disabled selected hidden></option>
                <option value="mobile">Mobile</option>
                <option value="computer">Computer</option>
                <option value="screen">Screen</option>
                <option value="components">Components</option>
            </select>
        </label>
        <button type="submit">Crear</button>
    </form>
    `;

    const element = render(selector, position, template);
    // Add event listener to the form to prevent default behavior
    element!.addEventListener('submit', handleSubmit);
    return element as HTMLFormElement;
}
