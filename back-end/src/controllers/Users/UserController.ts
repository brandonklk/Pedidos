import { Request, Response } from 'express';
import { resolve } from "path";
import NodeCache from 'node-cache';
import jwt from 'jsonwebtoken';

import connection from '../../database/connection';
import { UserInterface } from '../../interfaces/User/User-Interface';

import { generateValueForTokenOfResetPassword } from '../../utils/RandomToken';
import { encryptedPwd, comparePwd } from '../../utils/PasswordUtils';
import SendMailService from '../../modules/mail/SendMailService';
import env from '../../envi.config';
import { generateTokenOfAuthentication } from '../../utils/TokenUtils';

const cacheUser = new NodeCache({ stdTTL: 900000, checkperiod: 900000 });

const UserConnection = () => connection('users');

const getAllUserOfCacheOrReloadCache = async (reloadCache: boolean) => {
    const keyUserForCache = 'allUser';
    if(reloadCache) {
        const allUsers: Array<UserInterface> = await UserConnection().select('id', 'name', 'email', 'phone', 'avatar');
        cacheUser.del(keyUserForCache);
        cacheUser.set(keyUserForCache, allUsers);
    }
}

class UserController {

    async getUsers(req: Request, res: Response) {
        const { authorization } = req.headers;

        jwt.verify(authorization, env.tokenUser, (err, decode) => {
            if(err) {
                res.status(401).json({ mensagem: 'Acesso negado.' }).end();
            }
        });

        if (!cacheUser.has('allUser')) {
            await getAllUserOfCacheOrReloadCache(true);
        }

        return res.json(cacheUser.get('allUser'));
        
    }

    async createUser(req: Request, res: Response) {
        const { name, email, password: pwd, phone, avatar } = req.body;

        try {
            const emailExist = await UserConnection().where({ email });

            if(emailExist.length === 1){
                return res.status(400).send({ mensagem: 'Usuário já registrado.', type: 'danger' });
            }

            const password = await encryptedPwd(pwd);

            await UserConnection().insert({
                name, email, password, phone, avatar
            })

            await getAllUserOfCacheOrReloadCache(true);

            const newUser = { name, email, password, phone, avatar };

            return res.json({ user: newUser, mensagem: 'Usuário criado com sucesso.', type: 'success' });

        } catch (error) {
            console.log("error: ", error)
            return res.status(400).send({ mensagem: 'Erro ao criar novo usuário.', type: 'danger' });
        }
        
    }

    async authenticate(req: Request, res: Response) {
        const { email, password } = req.body;
        console.log(email, password)

        const user = await UserConnection().select().where({ email });

        if(user.length === 0) {
            return res.status(400).send({ mensagem: 'Usuário não encontrado.', type: 'danger' });
        }
  
        if(user.length > 1) {
            return res.status(400).send({ mensagem: 'E-mail invalido.', type: 'danger' });
        }

        const { id, name, email: mailDB, phone, avatar, password: pwdDB } = user[0];

        const token = generateTokenOfAuthentication(id);

        const userSerialize = {
            id, name, email, phone, avatar, token
        }

        if(await comparePwd(password, pwdDB)) {
            return res.status(400).send({ mensagem: 'Senha informada esta incorreta', type: 'danger' });
        }

        return res.json({ user: userSerialize, mensagem: 'Usuário autenticado com sucesso.', type: 'success' });
    
    }

    async generateTokenForForgotPassword(req: Request, res: Response) {
        const { email } = req.body;

        const user: UserInterface = await UserConnection().select().where({ email }).first();

        if(!user) {
            return res.status(400).send({ mensagem: 'Usuário não encontrado.', type: 'danger' });
        }

        const tokenForResetPassword = generateValueForTokenOfResetPassword();
        const templatePath = resolve(__dirname, "..", "..", "templates", "Forgot-Password.hbs");

        const variablesTemplate = {
            tokenForResetPassword: tokenForResetPassword
        }

        await SendMailService.execute(email, 'Recuperação de senha',
            variablesTemplate, templatePath)

        cacheUser.set(tokenForResetPassword, tokenForResetPassword, 600);

        return res.status(200).send({ mensagem: 'Token enviado com sucesso, favor verifique seu e-mail e informe o token.', type: 'warning' })
    }

    async forgotPassword(req: Request, res: Response) {
        const { email, password: pwd, token } = req.body;

        const getTokenForCache = cacheUser.get(token);

        if (!getTokenForCache) {
            return res.status(400).send({ mensagem: 'Token informado é invalido.', type: 'danger' })
        }

        if (getTokenForCache !== token) {
            return res.status(400).send({ mensagem: 'Token informado é diferente do disponibilizado.', type: 'danger' })
        }

        if (getTokenForCache === undefined) {
            return res.status(400).send({ mensagem: 'Token expirado inicie novamente a solicitação.', type: 'warning' })
        }

        const password = await encryptedPwd(pwd);

        await UserConnection().where({ email }).update({ password });

        cacheUser.del(email);

        return res.send({ mensagem: 'Senha alterada com sucesso.', type: 'success' });
    
    }

}
  
export default UserController;