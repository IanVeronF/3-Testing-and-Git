import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { createHeader } from './header';
 
describe('Given createHeader function', () => {
 
    // Limpiamos el DOM después de cada test
    afterEach(() => {
        document.body.innerHTML = '';
    });
 
    describe('When createHeader is called', () => {
 
        // Insertamos el header en el DOM antes de cada test
        beforeEach(() => {
            createHeader();
        });
 
        test('Then the title "Productos" is in the document', () => {
            const title = screen.getByRole('heading');
            expect(title).toBeInTheDocument();
        });
 
        test('Then the logo is in the document', () => {
            const logo = screen.getByAltText(/logo de la empresa/i);
            expect(logo).toBeInTheDocument();
        });
 
    test('Then the "Add" button is in the document', async () => {
    const btnElement = screen.getByRole('button');
    expect(btnElement).toBeInTheDocument();
    await userEvent.click(btnElement);
});
    });
});