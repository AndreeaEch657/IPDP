import  { FunctionComponent, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import * as React from 'react'
import AdminPage from "./Areas/Admin/AdminPage";
import HomePage from "./Areas/Home/HomePage";
import {Checkout} from "./Areas/Home/Checkout/CheckoutForm";
import { OrdersPage } from "./Areas/Orders/OrdersPage";
import { OrderDashboard } from "./Areas/Orders/OrderDashboard";


const HomeAsync = React.lazy(() => import('./Areas/Home/HomePage'));
//const ShopAsync = React.lazy(() => import('../UI/Areas/Shop/ShopPage'));
//const AdminAsync = React.lazy(() => import('../UI/Areas/Admin/AdminPage'));
//const ContactFormAsync = React.lazy(() => import('../UI/Areas/Home/ContactForm'));
//const ShopAdminAsync = React.lazy(() => import('../UI/Areas/Shop/ShopPageAdmin'));



export const Routes: React.FunctionComponent<{}> = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route exact path="/">
                    <Redirect push to={`/home`}></Redirect>
                </Route>
                <Route path="/home">
                        <HomePage />
                </Route>
                <Route path="/checkout">
                     <Checkout />
                </Route>
                <Route path="/orders">
                     <OrderDashboard />
                </Route>

                <Route path="/admin">
                    <div>
                        <AdminPage/>
                    </div>
                </Route>
                {/* <Route path="/web/contact">
                    <ContactFormAsync />
                </Route> */}
                <Route path="/shopadmin">
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