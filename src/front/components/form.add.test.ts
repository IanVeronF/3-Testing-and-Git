import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { createFormAdd } from './form.add';

describe('Given createFormAdd function', () => {

    afterEach(() => {
        document.body.innerHTML = '';
    });

    describe('When createFormAdd is called', () => {

        beforeEach(() => {
            createFormAdd();
        });

        test('Then the form is in the document', () => {
            const form = screen.getByRole('form');
            expect(form).toBeInTheDocument();
        });

        test('Then the form can be filled and submitted', async () => {
            await userEvent.type(screen.getByRole('textbox', { name: /name/i }), 'Product 1');
            await userEvent.click(screen.getByRole('button', { name: /crear/i }));
        });
    });
});