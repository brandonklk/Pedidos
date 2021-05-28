import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_STORAGE } from "./Constants";

const userStorage = USER_STORAGE;

//obtem o usuário logado.
export const getIdOfUser = async () => {
    try {
        const getIdCurrentUser = await AsyncStorage.getItem(userStorage);
        if(getIdCurrentUser !== null) {
            const { id } = JSON.parse(getIdCurrentUser);
            return id;
        } else {
            return getIdCurrentUser;
        }

    } catch (e) {
        console.error("Erro ao obter login do usuário.")
    }
}
