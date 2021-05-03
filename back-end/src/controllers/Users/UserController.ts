import { Request, Response } from 'express';
import { resolve } from "path";
import NodeCache from 'node-cache';

import connection from '../../database/connection';
import { UserInterface } from '../../interfaces/User/User-Interface';
import { generateValueForTokenOfResetPassword } from '../../utils/randomToken';
import { encryptedPwd, comparePwd } from '../../utils/passwordUtils';
import SendMailService from '../../modules/mail/SendMailService';

const cacheUser = new NodeCache({ checkperiod: 150, stdTTL: 300 });

const UserConnection = () => connection('users');

class UserController {

    async getUsers(req: Request, res: Response) {

        if (cacheUser.has('allUser')) {
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
            return res.status(400).send({ mensagem: 'Usuário não encontrado.', type: 'error' });
        }
  
        if(user.length > 1) {
            return res.status(400).send({ mensagem: 'E-mail invalido.', type: 'error' });
        }

        const { id, name, email: mailDB, phone, avatar, password: pwdDB } = user[0];

        if(await comparePwd(password, pwdDB)) {
            return res.status(400).send({ mensagem: 'Senha informada esta incorreta', type: 'error' });
        }

        return res.json({ id, name, email: mailDB, phone, avatar, mensagem: 'Usuário autenticado com sucesso.', type: 'success' });
    
    }

    async generateTokenForForgotPassword(req: Request, res: Response) {
        const { email } = req.body;

        const user: UserInterface = await UserConnection().select().where({ email }).first();

        if(!user) {
            return res.status(400).send({ mensagem: 'Usuário não encontrado.', type: 'warn' });
        }

        const tokenForResetPassword = generateValueForTokenOfResetPassword();
        const templatePath = resolve(__dirname, "..", "..", "templates", "Forgot-Password.hbs");

        const variablesTemplate = {
            tokenForResetPassword: tokenForResetPassword
        }

        await SendMailService.execute(email, 'Recuperação de senha',
            variablesTemplate, templatePath)

        cacheUser.set(email, tokenForResetPassword, 600);

        return res.status(200).send({ mensagem: 'Token enviado com sucesso, favor verifique seu e-mail e informe o token.', type: 'warn' })
    }

    async forgotPassword(req: Request, res: Response) {
        const { email, password: pwd, token } = req.body;

        const getTokenForCache = cacheUser.get(email);

        if (getTokenForCache === undefined) {
            return res.status(400).send({ mensagem: 'Token expirado inicie novamente a solicitação.', type: 'warn' })
        }

        if (getTokenForCache !== token) {
            return res.status(400).send({ mensagem: 'Token informado é diferente do disponibilizado.', type: 'warn' })
        }

        const password = await encryptedPwd(pwd);

        await UserConnection().where({ email }).update({ password });

        cacheUser.del(email);

        return res.send({ mensagem: 'Senha alterada com sucesso.', type: 'success' });
    
    }

}
  
export default UserController;