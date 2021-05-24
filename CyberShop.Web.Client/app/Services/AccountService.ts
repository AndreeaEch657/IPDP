import AppHTTPClient from "./AppHTTPClient";

export default class AccountService {
    private static readonly BASE_URL: string = "/Account";

    static singIn = (data: {
        email: string;
        password: string;
        returnUrl: string;
        reCaptchaToken: any;
    }): Promise<any> => {

        return AppHTTPClient
            .post(`${AccountService.BASE_URL}/Login`, data);

    }
    static forgotPassword = (data: {
        email: string;
        reCaptchaToken: string;
    }): Promise<any> => {
        return AppHTTPClient
            .post(`${AccountService.BASE_URL}/ForgotPassword`, data);
    }

    static resetPassword = (data: {
        email: string;
        token: string;
        password: string;
        confirmPassword: string;
    }): Promise<any> => {
        return AppHTTPClient
            .post(`${AccountService.BASE_URL}/ResetPasswordModel`, data);
    }

    static register = (data: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }): Promise<any> => {
        return AppHTTPClient
            .post(`${AccountService.BASE_URL}/Register`, data)
    }

    static checkUser = () : Promise<any> => {
        return AppHTTPClient.get(`${AccountService.BASE_URL}/IsUserAdmin`);
    }

    static logout = (): Promise<any> => {
        return AppHTTPClient
            .post(`${AccountService.BASE_URL}/Logout`);
    }



}