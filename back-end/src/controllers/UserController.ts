import { Request, Response } from 'express';
import connection from '../database/connection';
import { UserInterface } from '../interfaces/User-Interfaces';
import { encryptedPwd, comparePwd } from '../utils/passwordUtils';

class UserController {

    async getUsers(req: Request, res: Response) {
        const users = await connection('users').select('*');

        return res.json(users);
    }

    async create(req: Request, res: Response) {
        const { name, email, password: pwd, phone, avatar } = req.body;

        const emailExist = await connection('users').where({ email });

        if(emailExist.length){
            return res.status(400).send({ mensagem: 'mailalreadyregistered' });
        }

        const password = await encryptedPwd(pwd);

        await connection('users').insert({
            name, email, password, phone, avatar
        })

        return res.json({ name, email, phone });
    }

    async authenticate(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await connection('users').select().where({ email });

        if(user.length === 0) {
            return res.status(400).send({ mensagem: 'usernotfound' });
        }
  
        if(user.length > 1) {
            return res.status(400).send({ mensagem: 'twouserfound' });
        }

        const { id, name, email: mailDB, phone, avatar, password: pwdDB } = user[0];

        if(await comparePwd(password, pwdDB)) {
            return res.status(400).send({ mensagem: 'passwordinvalid' });
        }

        return res.json({ id, name, mailDB, phone, avatar, mensagem: 'userauthenticate' });
    
    }

}
  
export default UserController;