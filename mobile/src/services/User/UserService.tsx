import { showMessage } from 'react-native-flash-message';
import Api from '../../connections/api';
import { ICreateNewUser, IGenerateTokenForForgotPassword, IForgotPassword } from '../../interfaces/pages/InterfaceUtils';

export const autenticate = async (userAutenticate: object) => {
    try {
        
       const response = await Api.post(`/authenticate`, userAutenticate);
       return response.data;
    } catch (e) {
        if (e.message.includes("timeout")) {
            showMessage({ 
                message: "Limite de tempo atingido.",
                type: 'danger'
             })
             return null;
        }
        console.error("Login ou senha incorretas. ", e.type);
        return e.response.data;
    }
}

export const createNewUser = async (newUser: ICreateNewUser) => {
    try {
        const { email, password, name, phone, avatar  } = newUser;
        const dataNewUser = { email, password, name, phone, avatar }

        const response = await Api.post(`/create-user`, dataNewUser);
        return response.data;
    } catch (e) {
        console.error("Ocorreu uma falha na requisição. ", e);
        return e.response.data;
    }
}

export const generateTokenForForgotPassword = async (mailUser: IGenerateTokenForForgotPassword) => {
    try {
        const response = await Api.post(`/generate-token-forgot-password`, mailUser);
        return response.data;
    } catch (e) {
        console.error("Ocorreu uma falha na geração do token. ", e);
        return e.response.data;
    }
}

export const forgotPassword = async (dataForResetPassword: IForgotPassword) => {
    try {
        const { email, password, token } = dataForResetPassword;
        const dataForgotPassword = { email, password, token }

        const response = await Api.post(`/forgot-password`, dataForgotPassword);
        return response.data;
    } catch (e) {
        console.error("Ocorreu uma falha na alteração da senha. ", e);
        return e.response.data;
    }
}