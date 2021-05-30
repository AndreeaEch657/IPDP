import AppHTTPClient from "./AppHTTPClient";

export default class TransactionService {
    private static readonly BASE_URL: string = "/Transaction";

    static createNewOrder = (data) : Promise<any> =>{
        return AppHTTPClient
            .post(`${TransactionService.BASE_URL}/CreateOrder`, data)
    }

    static getUserOrders = () : Promise<any> =>{
        return AppHTTPClient
            .get(`${TransactionService.BASE_URL}/GetUserOrders`);
    }
    static getAdminOrders = () : Promise<any> =>{
        return AppHTTPClient
            .get(`${TransactionService.BASE_URL}/GetAdminOrders`);
    }

    static getOrderItems = (orderId) : Promise<any> =>{
        return AppHTTPClient
            .get(`${TransactionService.BASE_URL}/GetOrderItems/${orderId}`);
    }


}