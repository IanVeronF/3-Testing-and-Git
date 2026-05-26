import { render } from './base.js';

export function createHeader(
    selector: string = 'body',
    position: InsertPosition = 'afterbegin',
) {
    const template = /*html*/ `
        <header class="header">
            <div class="header__container">
                <img src="favicon.png" alt="Logo de la empresa" class="header__logo" />
                <h1 class="header__title">Productos</h1>
            </div>
            <menu>
              <button class="header__nav-button" type="button" aria-expanded="false" aria-controls="add">Add</button>
            </menu>
        </header>  
        <details class="add">
            <summary class="header__nav-title">Add</summary>  
        </details>
    `;

    const element = render(selector, position, template);

    return element as HTMLElement;
}
