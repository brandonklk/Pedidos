import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_STORAGE } from "./Constants";

const userStorage = USER_STORAGE;

// Obtêm o usuário logado
export const getCurrentUser = async () => {
    try {
        const getCurrentUser = await AsyncStorage.getItem(userStorage);

        if(getCurrentUser !== null) {
          return JSON.parse(getCurrentUser);
        } else {
            return getCurrentUser;
        }

    } catch (e) {
        console.error("Erro ao obter login do usuário. ", e)
    }
}

// Seta os dados dos usuário assim que logado
export const setUserInLocalStorage = async (valueUser: object) => {
    try {
        await removeUserAndTokenInLocalStorage();
        const valueOfUserInJsonString = JSON.stringify(valueUser)
        await AsyncStorage.setItem(userStorage, valueOfUserInJsonString);
    } catch (e) {
        console.error("Erro ao salvar dados de login. ", e)
    }
}

// Obtêm o token da sessão do usuário
export const getTokenOfSession = async () => {
    try {
        const getTokenSession = await AsyncStorage.getItem(userStorage);
        if (getTokenSession !== null) {
            const { token } = JSON.parse(getTokenSession);
            return token;
        } else {
            return null
        }
    } catch (e) {
        console.error("Erro ao obter login do usuário. ", e)
    }
}

// Seta os dados dos usuário assim que logado
export const removeUserAndTokenInLocalStorage = async () => {
    try {
        await AsyncStorage.multiRemove([userStorage])
    } catch (e) {
        console.error("Erro ao remover dados de login. ", e);
    }
}