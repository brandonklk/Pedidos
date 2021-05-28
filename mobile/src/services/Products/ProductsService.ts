import Api from '../../connections/api';

import { showMessage } from 'react-native-flash-message';
import { IProducts } from '../../interfaces/pages/InterfaceUtils';
import { getIdOfUser } from "../../utils/UserUtils";
import { getTokenOfSession } from "../../utils/StorageUtils";
import { getDateAndHoursCurrentInMilliseconds } from "../../utils/DateUtils";

interface INProducts extends Array<IProducts>{}

const getTokenUser = async () => { 
    const tokenUser = await getTokenOfSession();

    const headers = {
        Authorization: tokenUser
    };

    return headers;
}

export const getProductCurrentDayOfUser = async (page: number): Promise<[IProducts[], number, number]> => {

    let products: INProducts = [];
    let valueTotalSpending: number = 0; 
    let totalProducts: number = 0;

    try {
        const headers = await getTokenUser();
        const idUser = await getIdOfUser();
        const valuesForGetProductUser = {
            user: idUser,
            page: page
        };

        const response = await Api.post(`/get-products`, valuesForGetProductUser, { headers });

        products = response.data.products;
        valueTotalSpending = response.data.spending;
        totalProducts = Number(response.headers['x-total-count']);

    } catch (e) {
        console.error("Ocorre uma falha ao obter o produto. ", e);
        const { message, type } =  e.response.data;
        
        showMessage({
            message: message,
            type: type
        })

    }

    return [products, valueTotalSpending, totalProducts];
}

export const saveNewProduct = async (products: IProducts) => {

    const { name, description, img, price } = products;
    const headers = await getTokenUser();
    const idOfUser = await getIdOfUser();
    const dateInMilliseconds = getDateAndHoursCurrentInMilliseconds();

    const valueProduct = {
        name, description, img, price, 
        user: idOfUser, 
        date: dateInMilliseconds
    };

    try {
        const response = await Api.post(`/create-products`, valueProduct, { headers });
        return response.data;
    } catch (e) {
        console.error("Ocorreu uma falha ao salvar o produto. ", e);
        return e.response.data;
    }
}

export const editProduct = async (productForEdit: IProducts) => {
    try {
        const headers = await getTokenUser();
        const response = await Api.post(`/edit-product`, productForEdit, { headers });
        return response.data;
    } catch (e) {
        console.error("Ocorreu uma falha ao editar o produto. ", e);
        return e.response.data;
    }
}

export const deleteProduct = async (idOfProduct: number) => {
    try {
        const headers = await getTokenUser();
        const response = await Api.delete(`/delete-products/${idOfProduct}`, { headers });
        return response.data;
    } catch (e) {
        console.error(`Ocorreu uma falha ao excluir o produto. ${idOfProduct} `, e);
        return e.response.data;
    }
}
