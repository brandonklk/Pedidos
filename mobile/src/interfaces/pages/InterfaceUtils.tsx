import { MessageType } from "react-native-flash-message";

export interface ILoginInitialValues {
    email: string,
    password: string
}

export interface IParamsMessage {
    mensagem: string,
    type: MessageType,
}

export interface ICreateNewUser extends ILoginInitialValues {
    name: string,
    confirmPassword: string,
    phone?: string,
    avatar?: string,
}

export interface IParamsNewUser extends IParamsMessage {
    user: ICreateNewUser
}

export interface IGenerateTokenForForgotPassword {
    email: string
}

export interface IForgotPassword extends IGenerateTokenForForgotPassword {
    password: string,
    confirmPassword: string
    token: string
}

export interface IProducts {
    id: number,
    name: string,
    price: number,
    description: string,    
    purchase_date: number,
    img: string,
    removeProduct: Function
}
