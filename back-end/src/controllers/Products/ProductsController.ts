import { Request, Response } from 'express';
import connection from '../../database/connection';
import { ProductsInterface } from '../../interfaces/Products/Products-Interface';
import { encryptedPwd, comparePwd } from '../../utils/passwordUtils';

const ProductsConnection = () => connection('products');

class ProductsController {

    async getProducts(req: Request, res: Response) {
        const products: Array<ProductsInterface> = await ProductsConnection().select('*');

        return res.json(products);
    }

    async createProducts(req: Request, res: Response) {
        const { name, price, description } = req.body;

        await ProductsConnection().insert({
            name, price, description
        })

        return res.json({ name, price, description });
    }

    async removeProducts(req: Request, res: Response) {
        const { id } = req.params;
        const msg = "";

        await connection('products').where({ id }).del();
        
        return res.status(200)
            .json({ mensagem: 'Produto ID: ' + id + ' deletado com sucesso.' });
    }

    async editProducts(req: Request, res: Response) {
    const { id, name, price, description } = req.body;

    let getProductsAndEdit;

    try {
        await connection.transaction(async trx => {
        
        getProductsAndEdit = await ProductsConnection()
            .where({ id }).update({ name, price, description })
            .transacting(trx)
        });

    } catch (error) {
        console.error(error);
        return res.status(400).send({ mensagem: 'Erro ao editar produtos.' });
    }

    return res.json({ getProductsAndEdit, mensagem: 'Produto editado com sucesso.' });
    }
}
  
export default ProductsController;
