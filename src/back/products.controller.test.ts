import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest';
import { ProductsController } from './products.controller';
import type { Request, Response, NextFunction } from 'express';

// Mock del repositorio con todos los métodos que usa el controller
// mockResolvedValue (sin Once) devuelve siempre array vacío por defecto
// en cada test sobreescribiremos el método que necesitemos
const mockRepo = {
    read: vi.fn().mockResolvedValue([]),
    readById: vi.fn().mockResolvedValue([]),
    create: vi.fn().mockResolvedValue([]),
    update: vi.fn().mockResolvedValue([]),
    delete: vi.fn().mockResolvedValue([]),
};

// Variables accesibles en todos los tests
let controller: ProductsController;
let req: Request;
let res: Response;
let next: NextFunction;

describe('Given an instantiated ProductsController', () => {
    // Inicializamos las variables antes de cada test
    beforeEach(() => {
        // req vacío, cada test añadirá params o body si lo necesita
        req = {} as Request;

        // Mockeamos los métodos de res que usa el controller
        // mockReturnValue(res) permite encadenar res.status(201).json(...)
        res = {
            status: vi.fn().mockReturnValue(res),
            json: vi.fn(),
        } as unknown as Response;

        // Mockeamos next para verificar que se llama cuando hay errores
        next = vi.fn() as NextFunction;

        // Instanciamos el controller con el repo mockeado
        controller = new ProductsController(mockRepo);
    });

    // Limpiamos todos los mocks después de cada test
    // para evitar que interfieran entre sí
    afterEach(() => {
        vi.clearAllMocks();
    });

    // ─── INSTANCIACIÓN ───────────────────────────────────────────────────────────

    describe('When we instantiate it', () => {
        test('Then it should be defined', () => {
            expect(controller).toBeDefined();
        });
        test('Then it should be an instance of ProductsController', () => {
            expect(controller).toBeInstanceOf(ProductsController);
        });
    });

    // ─── GET ALL ─────────────────────────────────────────────────────────────────

    describe('When method getAll is called', () => {
        describe('And repo returns valid data', () => {
            test('Then it should call json with a list of products', async () => {
                // Arrange
                const mockProducts = [{ id: '1', name: 'Product 1' }];
                // Sobreescribimos read para que devuelva mockProducts en este test
                // mockResolvedValueOnce simula que la promesa se resuelve correctamente
                mockRepo.read = vi.fn().mockResolvedValueOnce(mockProducts);

                // Act
                await controller.getAll(req, res, next);

                // Assert
                // Verificamos que read fue llamado
                expect(mockRepo.read).toHaveBeenCalled();
                // objectContaining verifica que el objeto contiene AL MENOS estas propiedades
                expect(res.json).toHaveBeenCalledWith(
                    expect.objectContaining({
                        results: mockProducts,
                        error: '',
                    }),
                );
                expect(next).not.toHaveBeenCalled();
            });
        });
        describe('And repo throws an Error', () => {
            test('Then it should call next with the error', async () => {
                // Arrange
                // mockRejectedValueOnce simula que la promesa se rechaza con un error
                mockRepo.read = vi
                    .fn()
                    .mockRejectedValueOnce(
                        new Error('Failed to fetch products'),
                    );

                // Act
                await controller.getAll(req, res, next);

                // Assert: el controller debe pasar el error a next
                expect(next).toHaveBeenCalledWith(
                    expect.objectContaining({} as Error),
                );
            });
        });
    });

    // ─── GET BY ID ───────────────────────────────────────────────────────────────

    describe('When method getById is called', () => {
        describe('And repo returns valid data', () => {
            test('Then it should call json with a single product', async () => {
                // Arrange
                const mockProduct = { id: '1', name: 'Product 1' };
                // Simulamos que el id viene en la URL: /products/1
                req.params = { id: '1' };
                mockRepo.readById = vi.fn().mockResolvedValueOnce(mockProduct);

                // Act
                await controller.getById(req, res, next);

                // Assert
                // Verificamos que readById fue llamado con el id correcto
                expect(mockRepo.readById).toHaveBeenCalledWith('1');
                // El controller envuelve el producto en un array dentro de results
                expect(res.json).toHaveBeenCalledWith(
                    expect.objectContaining({
                        results: [mockProduct],
                        error: '',
                    }),
                );
                expect(next).not.toHaveBeenCalled();
            });
        });
        describe('And repo throws an Error', () => {
            test('Then it should call next with the error', async () => {
                // Arrange: simulamos un id que no existe
                req.params = { id: '999' };
                mockRepo.readById = vi
                    .fn()
                    .mockRejectedValueOnce(new Error('Product not found'));

                // Act
                await controller.getById(req, res, next);

                // Assert
                expect(next).toHaveBeenCalledWith(
                    expect.objectContaining({} as Error),
                );
            });
        });
    });

    // ─── CREATE ──────────────────────────────────────────────────────────────────

    describe('When method create is called', () => {
        describe('And repo returns valid data', () => {
            test('Then it should call status 201 and json with the new product', async () => {
                // Arrange
                const mockProduct = { id: '2', name: 'New Product' };
                // Simulamos que los datos vienen en el body de la petición POST
                req.body = { name: 'New Product' };
                mockRepo.create = vi.fn().mockResolvedValueOnce(mockProduct);

                // Act
                await controller.create(req, res, next);

                // Assert
                // Verificamos que create fue llamado con los datos del body
                expect(mockRepo.create).toHaveBeenCalledWith(req.body);
                // create es el único método que devuelve status 201 (recurso creado)
                expect(res.status).toHaveBeenCalledWith(201);
                expect(res.json).toHaveBeenCalledWith(
                    expect.objectContaining({
                        results: [mockProduct],
                        error: '',
                    }),
                );
                expect(next).not.toHaveBeenCalled();
            });
        });
        describe('And repo throws an Error', () => {
            test('Then it should call next with the error', async () => {
                // Arrange
                req.body = { name: 'New Product' };
                mockRepo.create = vi
                    .fn()
                    .mockRejectedValueOnce(
                        new Error('Failed to create product'),
                    );

                // Act
                await controller.create(req, res, next);

                // Assert
                expect(next).toHaveBeenCalledWith(
                    expect.objectContaining({} as Error),
                );
            });
        });
    });

    // ─── UPDATE ──────────────────────────────────────────────────────────────────

    describe('When method update is called', () => {
        describe('And repo returns valid data', () => {
            test('Then it should call json with the updated product', async () => {
                // Arrange
                const mockProduct = { id: '1', name: 'Updated Product' };
                // update necesita el id en params y los nuevos datos en body
                req.params = { id: '1' };
                req.body = { name: 'Updated Product' };
                mockRepo.update = vi.fn().mockResolvedValueOnce(mockProduct);

                // Act
                await controller.update(req, res, next);

                // Assert
                // Verificamos que update fue llamado con el id y los nuevos datos
                expect(mockRepo.update).toHaveBeenCalledWith('1', req.body);
                expect(res.json).toHaveBeenCalledWith(
                    expect.objectContaining({
                        results: [mockProduct],
                        error: '',
                    }),
                );
                expect(next).not.toHaveBeenCalled();
            });
        });
        describe('And repo throws an Error', () => {
            test('Then it should call next with the error', async () => {
                // Arrange
                req.params = { id: '1' };
                req.body = { name: 'Updated Product' };
                mockRepo.update = vi
                    .fn()
                    .mockRejectedValueOnce(
                        new Error('Failed to update product'),
                    );

                // Act
                await controller.update(req, res, next);

                // Assert
                expect(next).toHaveBeenCalledWith(
                    expect.objectContaining({} as Error),
                );
            });
        });
    });

    // ─── DELETE ──────────────────────────────────────────────────────────────────

    describe('When method delete is called', () => {
        describe('And repo returns valid data', () => {
            test('Then it should call json with the deleted product', async () => {
                // Arrange
                const mockProduct = { id: '1', name: 'Deleted Product' };
                req.params = { id: '1' };
                mockRepo.delete = vi.fn().mockResolvedValueOnce(mockProduct);

                // Act
                await controller.delete(req, res, next);

                // Assert
                // Verificamos que delete fue llamado con el id correcto
                expect(mockRepo.delete).toHaveBeenCalledWith('1');
                expect(res.json).toHaveBeenCalledWith(
                    expect.objectContaining({
                        results: [mockProduct],
                        error: '',
                    }),
                );
                expect(next).not.toHaveBeenCalled();
            });
        });
        describe('And repo throws an Error', () => {
            test('Then it should call next with the error', async () => {
                // Arrange
                req.params = { id: '1' };
                mockRepo.delete = vi
                    .fn()
                    .mockRejectedValueOnce(
                        new Error('Failed to delete product'),
                    );

                // Act
                await controller.delete(req, res, next);

                // Assert
                expect(next).toHaveBeenCalledWith(
                    expect.objectContaining({} as Error),
                );
            });
        });
    });
});
