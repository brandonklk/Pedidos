import { randomBytes } from 'crypto';

export const generateValueForTokenOfResetPassword = () => {
    return randomBytes(20).toString('hex');
}