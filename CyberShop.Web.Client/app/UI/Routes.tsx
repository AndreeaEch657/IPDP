import  { FunctionComponent, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import * as React from 'react'
import { QueryClient, QueryClientProvider } from "react-query";
import AdminPage from "./Areas/Admin/AdminPage";


const HomeAsync = React.lazy(() => import('./Areas/Home/HomePage'));
//const ShopAsync = React.lazy(() => import('../UI/Areas/Shop/ShopPage'));
//const AdminAsync = React.lazy(() => import('../UI/Areas/Admin/AdminPage'));
//const ContactFormAsync = React.lazy(() => import('../UI/Areas/Home/ContactForm'));
//const ShopAdminAsync = React.lazy(() => import('../UI/Areas/Shop/ShopPageAdmin'));



export const Routes: React.FunctionComponent<{}> = () => {
    const client = new QueryClient();
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route exact path="/">
                    <Redirect push to={`/web/home`}></Redirect>
                </Route>
                <Route path="/web/home">
                     <QueryClientProvider client={client}>
                        <HomeAsync />
                    </QueryClientProvider>,
                </Route>
                <Route path="/web/shop">
                    <div>
                        Shop
                    </div>
                </Route>
                <Route path="/web/admin">
                    <div>
                        <AdminPage/>
                    </div>
                </Route>
                {/* <Route path="/web/contact">
                    <ContactFormAsync />
                </Route> */}
                <Route path="/web/shopadmin">
                    <div>
                        Shop
                        </div>
                </Route>
                <Route path="*">
                    <div>Not found</div>
                </Route>

            </Switch>
        </Suspense>
    )
}


//import React, { FunctionComponent, Suspense } from "react";
//import { Switch, Route, Redirect } from "react-router-dom";

//import HomePage from '../UI/Areas/Home/HomePage';
//import ShopPage from '../UI/Areas/Shop/ShopPage';

//export const Routes: React.FunctionComponent<{}> = (props) => {
//    return (

//            <Switch>
//                <Route exact path="/">
//                    <Redirect push to={`/web/home`}></Redirect>
//                </Route>
//                <Route path="/web/home">
//                    <HomePage />
//                </Route>
//                <Route path="/web/shop">
//                    <ShopPage />
//                </Route>
//                <Route path="*">
//                    <div>Not found</div>
//                </Route>
//            </Switch>

//    )
//}