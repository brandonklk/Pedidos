import { Request, Response } from 'express';
import connection from '../../database/connection';
import { UserInterface } from '../../interfaces/User/User-Interface';
import { encryptedPwd, comparePwd } from '../../utils/passwordUtils';
import NodeCache from 'node-cache';
import { generateValueForTokenOfResetPassword } from '../../utils/randomToken';

const cacheUser = new NodeCache({ checkperiod: 3600 });

const UserConnection = () => connection('users');

class UserController {

    async getUsers(req: Request, res: Response) {

        if (cacheUser.get('allUser') !== undefined) {
            return res.json(cacheUser.get('allUser'));
        }

        const users: Array<UserInterface> = await UserConnection().select('id', 'name', 'email', 'phone', 'avatar');
        cacheUser.set('allUser', users);

        return res.json(users);
    }

    async createUser(req: Request, res: Response) {
        const { name, email, password: pwd, phone, avatar } = req.body;

        const emailExist = await UserConnection().where({ email });

        if(emailExist.length){
            return res.status(400).send({ mensagem: 'mailalreadyregistered' });
        }

        const password = await encryptedPwd(pwd);

        await UserConnection().insert({
            name, email, password, phone, avatar
        })

        return res.json({ name, email, phone, avatar });
    }

    async authenticate(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await UserConnection().select().where({ email });

        if(user.length === 0) {
            return res.status(400).send({ mensagem: 'usernotfound' });
        }
  
        if(user.length > 1) {
            return res.status(400).send({ mensagem: 'twouserfound' });
        }

        const { id, name, email: mailDB, phone, avatar, password: pwdDB } = user[0];

        if(await comparePwd(password, pwdDB)) {
            return res.status(400).send({ mensagem: 'Senha informada esta incorreta', type: 'error' });
        }

        return res.json({ id, name, email: mailDB, phone, avatar, mensagem: 'userauthenticate', type: 'success' });
    
    }

    async generateTokenForForgotPassword(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await UserConnection().select().where({ email });

        if(user.length === 0) {
            return res.status(400).send({ mensagem: 'Usuário não encontrado.', type: 'warn' });
        }
  
        if(user.length > 1) {
            return res.status(400).send({ mensagem: 'Foram encontrados dois usuário com o mesmo endereço de e-mail.', type: 'warn' });
        }

        const tokenForResetPassword = generateValueForTokenOfResetPassword();

        cacheUser.set(email, tokenForResetPassword);

        return res.json(tokenForResetPassword);
    }

    async forgotPassword(req: Request, res: Response) {
        const { email, password, token } = req.body;

        const getTokenForCache = cacheUser.get(email);

        if (getTokenForCache === undefined) {
            return res.status(400).send({ mensagem: 'Token expirado inicie novamente a solicitação.', type: 'warn' })
        }

        if (getTokenForCache !== token) {
            return res.status(400).send({ mensagem: 'Token informado é diferente do disponibilizado.', type: 'warn' })
        }

        await UserConnection().where({ email }).update({ password });

        return res.send({ mensagem: 'Senha alterada com sucesso.', type: 'success' });
    
    }

}
  
export default UserController;