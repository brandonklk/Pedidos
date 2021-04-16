const bcrypt = require('bcrypt');
const saltRounds = 10;

export const encryptedPwd = async (pwd: string) => {
    return await bcrypt.hash(pwd, saltRounds);
}

export const comparePwd = async (passwordTyped: string, passwordDataBase: string) => {
    return !(await bcrypt.compare(passwordTyped, passwordDataBase));
}