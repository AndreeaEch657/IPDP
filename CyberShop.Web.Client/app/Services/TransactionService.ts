import AppHTTPClient from "./AppHTTPClient";

export default class TransactionService {
    private static readonly BASE_URL: string = "/Transaction";

    static createNewOrder = (data) : Promise<any> =>{
        return AppHTTPClient
            .post(`${TransactionService.BASE_URL}/CreateOrder`, data)
    }


}