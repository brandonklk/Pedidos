import { Request, Response } from 'express';
import NodeCache from 'node-cache';
import connection from '../../database/connection';
import { ProductsInterface } from '../../interfaces/Products/Products-Interface';
import { buildDateAndHoursDayCurrent } from '../../utils/DateUtils';
import { sumSpending } from '../../utils/SumSpending';
import { tokenIsValid } from '../../utils/TokenUtils';

const cacheProducts = new NodeCache({ stdTTL: 900000, checkperiod: 900000 });

const ProductsConnection = () => connection('products');

class ProductsController {

    async getProductsDateNowOfUser(req: Request, res: Response) {
        const { user: user_id, page = 1 } = req.body;
        const { authorization } = req.headers;

        tokenIsValid(authorization, res);

        let products: Array<ProductsInterface> = [];
        let valueSpending: number = 0
        let productTotal: string;
        const [initialDayInMilliseconds, finishDayInMilliseconds] = buildDateAndHoursDayCurrent();

        try {

            const countRegister: Array<any> = await ProductsConnection()
                .where({ user_id })                
                .andWhere('purchase_date', '>=', initialDayInMilliseconds)
                .andWhere('purchase_date', '<=', finishDayInMilliseconds).count('* as total');
            
            const spending: Array<ProductsInterface> = await ProductsConnection()
                .select('price')
                .where({ user_id })                
                .andWhere('purchase_date', '>=', initialDayInMilliseconds)
                .andWhere('purchase_date', '<=', finishDayInMilliseconds);

            const { total }: { total: string } = countRegister[0];
            productTotal = total;

            products = await ProductsConnection()
                .limit(15)
                .offset((page - 1) * 15)
                .select('*')
                .where({ user_id })                
                .andWhere('purchase_date', '>=', initialDayInMilliseconds)
                .andWhere('purchase_date', '<=', finishDayInMilliseconds);

            valueSpending = sumSpending(spending);

        } catch (e) {

            console.error("Erro ao obter produto ", e);
            return res.status(400).send({ mensagem: 'Não foi possivel obter os produtos comprados.', type: 'danger' });

        }

        res.header('X-Total-Count', productTotal);
        return res.json({ products, spending: valueSpending });
    }

    async createProducts(req: Request, res: Response) {
        const { name, price, description, img, user: user_id, date: purchase_date } = req.body;
        const { authorization } = req.headers;

        tokenIsValid(authorization, res);

        try {    
            await ProductsConnection().insert({
                name, price, description, img, user_id, purchase_date
            });
        } catch (e) {
            console.error("Erro ao criar produto ", e);
            return res.status(400).send({ mensagem: 'Não foi possivel salvar o produto.', type: 'danger' });
        }

        return res.status(200).send({ mensagem: 'Produto registrado com sucesso.', type: 'success' });
    }

    async removeProducts(req: Request, res: Response) {
        const { id } = req.params;
        const { authorization } = req.headers;
        
        tokenIsValid(authorization, res);

        try {
            await connection('products').where({ id }).del();
        } catch (e) {
            console.error("Erro ao deletar produto ", e)
            return res.status(200).send({ mensagem: 'Não foi possivel deletar um produto.', type: 'danger' });
        }
        
        return res.status(200)
            .json({ mensagem: 'Produto deletado com sucesso.', type: 'success' });
    }

    async editProducts(req: Request, res: Response) {
        const { id, name, price, description } = req.body;
        const { authorization } = req.headers;

        tokenIsValid(authorization, res);

        let getProductsAndEdit;

        try {
            await connection.transaction(async trx => {
            
            getProductsAndEdit = await ProductsConnection()
                .where({ id }).update({ name, price, description })
                .transacting(trx)
            });

        } catch (error) {
            console.error(error);
            return res.status(400).send({ mensagem: 'Erro ao editar produtos.', type: 'danger' });
        }

        return res.json({ getProductsAndEdit, mensagem: 'Produto editado com sucesso.', type: 'success' });
    }
}
  
export default ProductsController;