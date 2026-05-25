import { NextFunction, Request, Response } from 'express';
import createDebug from 'debug';

import type { AppResponse } from '../types/app-response';
import type { ProductCreateDTO } from './dto/products.dto';

import { Product } from '@prisma/client';
import { ProductRepo } from '../repo/products.repository.js';

const debug = createDebug('movies:controller:products');

export class ProductsController {
    constructor(private repoProducts: ProductRepo) {
        debug('Instanciando');
    }

    private makeResponse(results: Product[]) {
        const data: AppResponse<Product> = {
            results,
            error: '',
        };
        return data;
    }

    getAll = async (_req: Request, res: Response, next: NextFunction) => {
        debug('getAll');
        try {
            const products = await this.repoProducts.read();
            res.json(this.makeResponse(products));
        } catch (error) {
            next(error);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
        debug('getById');

        try {
            const { id } = req.params;
            const product = await this.repoProducts.readById(id);
            res.json(this.makeResponse([product]));
        } catch (error) {
            next(error);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        debug('create');
        try {
            const newData: ProductCreateDTO = req.body;
            const product = await this.repoProducts.create(newData);
            res.status(201);
            res.json(this.makeResponse([product]));
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        debug('update');
        try {
            const { id } = req.params;
            const newData = req.body;
            const product = await this.repoProducts.update(id, newData);
            res.json(this.makeResponse([product]));
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        debug('delete');
        try {
            const { id } = req.params;
            const product = await this.repoProducts.delete(id);
            res.json(this.makeResponse([product]));
        } catch (error) {
            next(error);
        }
    };
}
