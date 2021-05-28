import { Response } from 'express';
import jwt from 'jsonwebtoken';
import env from '../envi.config';

export const tokenIsValid = (authorization: string, res: Response) => {
    jwt.verify(authorization, env.tokenUser, (err, decode) => {
        if(err) {
            res.status(401).json({ mensagem: 'Acesso negado.', type: 'danger' }).end();
        }
    });
}

export const generateTokenOfAuthentication = (id: number) => {
    // 21600000: 6 horas, 3600000: 1 hora
    return jwt.sign({ userId: id }, env.tokenUser, { expiresIn: 21600000 });
}

export const refreshToken = () => {
    // TODO:
}