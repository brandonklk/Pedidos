import { ProductsInterface } from "../interfaces/Products/Products-Interface";

export const sumSpending = (items: Array<ProductsInterface>) => {
    return items.reduce((valueTotal, { price }) => valueTotal + price, 0);
}