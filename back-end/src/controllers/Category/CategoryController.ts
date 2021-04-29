import { Request, Response } from 'express';
import connection from '../../database/connection';
import { CategoriesInterface } from '../../interfaces/Categorie/Categorie-Interface';

const CategoryConnection = () => connection('categories');

class CategoryController {

    async getCategory(req: Request, res: Response) {

        const categories: Array<CategoriesInterface> = await CategoryConnection().select('*');

        return res.json(categories);
    }

    async createCategory(req: Request, res: Response) {
        const { name, parent: parent_id } = req.body;

        try {

            await connection.transaction(async trx => {
          
                await CategoryConnection().insert({
                    name, parent_id
                }).transacting(trx)
            
            });

        } catch (error) {
            console.error(error);
            return res.status(400).send({ mensagem: 'Erro ao criar categoria.' });
        }

        return res.json({ name, parent: parent_id });

    }

    async removeCategory(req: Request, res: Response) {
        const { id } = req.params;

        await connection('categories').where({ id }).del();
        
        return res.status(200)
            .json({ mensagem: 'Categoria deletada com sucesso.' });
    
    }

    async editCategory(req: Request, res: Response) {
        const { id, name, parent: parent_id } = req.body;

        let getCategorieAndEdit;

        try {
            await connection.transaction(async trx => {
          
            getCategorieAndEdit = await CategoryConnection()
                .where({ id }).update({ name, parent_id })
                .transacting(trx)
            });

        } catch (error) {
            console.error(error);
            return res.status(400).send({ mensagem: 'Erro ao editada categoria.' });
        }

        return res.json({ getCategorieAndEdit, mensagem: 'Categoria editada com sucesso.' });
    }

}
  
export default CategoryController;