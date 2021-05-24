import AppHTTPClient from "./AppHTTPClient";
//const regeneratorRuntime = require("regenerator-runtime");


interface IUser {
    fullName: string,
    email: string
}

export default class AdminService {
    private static readonly BASE_URL: string = "/UserAdmin";

    static addUser = (data: {
        email: string,
        firstName: string,
        lastName: string
    }): Promise<any> => {
        return AppHTTPClient
            .post(`${AdminService.BASE_URL}/AddUser`, data);
    }



    static deleteUsers = (data: string[]): Promise<any> => {
        return AppHTTPClient
            .delete(`${AdminService.BASE_URL}/DeleteUsers`, { data: data })
    }

    
    static getUsers = (): Promise<any> => {
        return AppHTTPClient
            .get(`${AdminService.BASE_URL}/GetUsers`)
    }

    static logout = (): Promise<any> => {
        return AppHTTPClient
            .post(`${AdminService.BASE_URL}/Logout`);
    }



    // static forgotPassword = (data: {
    //     email: string;
    //     reCaptchaToken: string;
    // }): Promise<any> => {
    //     return AppHTTPClient
    //         .post(`${AccountServices.BASE_URL}/ForgotPassword`, data);
    // }

    // static resetPassword = (data: {
    //     email: string;
    //     token: string;
    //     password: string;
    //     confirmPassword: string;
    // }): Promise<any> => {
    //     return AppHTTPClient
    //         .post(`${AccountServices.BASE_URL}/ResetPasswordModel`, data);
    // }

}