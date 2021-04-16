import axios from 'axios';



const AppHTTPClient = axios.create({

    timeout: 30000
});

AppHTTPClient.interceptors.request.use(
    function (config) {
        //add tokens, headers etc ehre
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

AppHTTPClient.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (!!error.response && !!error.response.data.error && !!error.response.data.error.message && error.response.data.error.details) {

        } else if (!!error.response && !!error.response.data.error && !!error.response.data.error.message) {

        } else if (!error.response) {

        }
        setTimeout(() => { }, 1000);
        console.log(error + " " + error.response + " " + error.response.data);
        return Promise.reject(error.response.data);
    }
);

export default AppHTTPClient;