import bcrypt from 'bcrypt';
const saltRounds = Math.floor(Math.random() * 12);

export const encryptedPwd = async (pwd: string) => {
    return await bcrypt.hash(pwd, saltRounds);
}

export const comparePwd = async (passwordTyped: string, passwordDataBase: string) => {
    return !(await bcrypt.compare(passwordTyped, passwordDataBase));
}