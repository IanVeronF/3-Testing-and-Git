import { ApiRepo } from './api.repo';

// Declaramos repo fuera para que sea accesible en todos los tests
let repo: ApiRepo;

// Antes de cada test creamos una instancia nueva del repo
// así cada test empieza con un objeto limpio
beforeEach(() => {
    repo = new ApiRepo();
});

// Después de cada test limpiamos todos los mocks
// para que no interfieran con el siguiente test
afterEach(() => {
    vi.clearAllMocks();
});

describe('Given an instance of ApiRepo', () => {

    describe('When getProducts is called', () => {

        test('And fetch is ok, it returns an array', async () => {
            // vi.spyOn intercepta la función fetch global
            // en lugar de hacer una petición real a la API, devuelve lo que nosotros le digamos
            // mockResolvedValue simula que la promesa se resuelve correctamente
            vi.spyOn(globalThis, 'fetch').mockResolvedValue({
                ok: true, // simulamos que la respuesta HTTP es correcta (status 200)
                json: vi.fn().mockResolvedValueOnce([]), // simulamos que json() devuelve un array vacío
            } as unknown as Response);

            // Llamamos al método real del repo
            const result = await repo.getProducts();

            // Verificamos que fetch fue llamado (el repo intentó contactar la API)
            expect(fetch).toHaveBeenCalled();
            // Verificamos que el resultado es un array
            expect(result).toBeInstanceOf(Array);
        });

        test('And fetch is NOT ok, it rejects', async () => {
            // Simulamos que la respuesta HTTP es incorrecta (status 404, 500, etc.)
            // ok: false hace que el repo lance un error
            vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: false } as unknown as Response);

            // Verificamos que el repo lanza un error cuando fetch falla
            expect(repo.getProducts()).rejects.toThrow();
        });
    });

    describe('When createProduct is called', () => {

        test('And fetch is ok, it returns a product', async () => {
            vi.spyOn(globalThis, 'fetch').mockResolvedValue({
                ok: true,
                json: vi.fn().mockResolvedValueOnce({}), // devuelve un objeto vacío simulando un producto
            } as unknown as Response);

            // Llamamos a createProduct con datos mínimos de un producto
            const result = await repo.createProduct({ name: 'Product 1' });

            // Verificamos que el resultado es un objeto (el producto creado)
            expect(result).toBeInstanceOf(Object);
        });

        test('And fetch is NOT ok, it rejects', async () => {
            vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: false } as unknown as Response);
            expect(repo.createProduct({ name: 'Product 1' })).rejects.toThrow();
        });
    });

    describe('When updateProduct is called', () => {

        test('And fetch is ok, it returns a product', async () => {
            vi.spyOn(globalThis, 'fetch').mockResolvedValue({
                ok: true,
                json: vi.fn().mockResolvedValueOnce({}),
            } as unknown as Response);

            // Llamamos a updateProduct con el id del producto y los nuevos datos
            const result = await repo.updateProduct(1, { name: 'Updated' });
            expect(result).toBeInstanceOf(Object);
        });

        test('And fetch is NOT ok, it rejects', async () => {
            vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: false } as unknown as Response);
            expect(repo.updateProduct(1, { name: 'Updated' })).rejects.toThrow();
        });
    });

    describe('When deleteProduct is called', () => {

        test('And fetch is ok, it returns an array', async () => {
            vi.spyOn(globalThis, 'fetch').mockResolvedValue({
                ok: true,
                json: vi.fn().mockResolvedValueOnce([]), // delete devuelve un array de productos
            } as unknown as Response);

            // Llamamos a deleteProduct con el id del producto a eliminar
            const result = await repo.deleteProduct(1);
            expect(result).toBeInstanceOf(Array);
        });

        test('And fetch is NOT ok, it rejects', async () => {
            vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: false } as unknown as Response);
            expect(repo.deleteProduct(1)).rejects.toThrow();
        });
    });
});