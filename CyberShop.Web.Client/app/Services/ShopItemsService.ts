import AppHTTPClient from "./AppHTTPClient";

export default class ShopItemsService {
    private static readonly BASE_URL: string = "/ShopItems";

    static getCompleteShopItems = (): Promise<any> => {
        return AppHTTPClient
            .get(`${ShopItemsService.BASE_URL}/GetCompleteShopItems`)
    }


}