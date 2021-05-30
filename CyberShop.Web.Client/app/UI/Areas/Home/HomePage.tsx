import { Badge, Drawer, Grid, LinearProgress } from "@material-ui/core";
import * as React from "react"
import { useEffect, useState } from "react";
import { CompleteShopItem } from "../../../Models/CompleteShopItem";
import ShopItemsService from "../../../Services/ShopItemsService";
import Cart from "./Cart/Cart";
import { StyledButton, Wrapper } from "./Home.styles";
import Item from "./Item/Item";

import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";



export interface ICartItem extends CompleteShopItem{
    amount: number;
    

}
const HomePage: React.FunctionComponent<{}> = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState<ICartItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [completShopItems, setCompleteShopItems] = useState<ICartItem[]>([]);

    useEffect(() => {
        setIsLoading(true);
        setCartItems(JSON.parse(localStorage.getItem("cartItems")) ? JSON.parse(localStorage.getItem("cartItems")) as any : []);
        console.log(JSON.parse(localStorage.getItem("cartItems")));

        ShopItemsService.getCompleteShopItems().
		then((resp) => {
			setCompleteShopItems(resp.data);
            console.log(resp.data);
        })
        .finally(() =>{
            setIsLoading(false);
        })
        
        ;
    }, []);


    useEffect(()=>{
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

    },[cartItems])

    const handleAddToCart = (clickedItem: ICartItem) => {
        setCartItems((prev) => {
            // 1. Is the item already added in the cart?
            const isItemInCart = prev.find(
                (item) => item.shopItemId === clickedItem.shopItemId
            );

            if (isItemInCart) {
                return prev.map((item) =>
                    item.shopItemId === clickedItem.shopItemId
                        ? { ...item, amount: item.amount + 1 }
                        : item
                );
            }
            // First time the item is added
            return [...prev, { ...clickedItem, amount: 1 }];
        });
         
    };


    const handleRemoveFromCart = (id: number) => {
        setCartItems((prev) =>
            prev.reduce((ack, item) => {
                if (item.shopItemId === id) {
                    if (item.amount === 1) return ack;
                    return [...ack, { ...item, amount: item.amount - 1 }];
                } else {
                    return [...ack, item];
                }
            }, [] as ICartItem[])
        );
    };

    const getTotalItems = (items: ICartItem[]) =>
        items.reduce((ack: number, item) => ack + item.amount, 0);

    
    if (isLoading) return <LinearProgress />;


    return (
        <Wrapper>
            <Drawer
                anchor="right"
                open={cartOpen}
                onClose={() => setCartOpen(false)}
            >
                <Cart
                    cartItems={cartItems}
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                />
            </Drawer>
            <StyledButton onClick={() => setCartOpen(true)}>
                <Badge badgeContent={getTotalItems(cartItems)} color="error">
                    <AddShoppingCartIcon />
                </Badge>
            </StyledButton>
            <Grid container spacing={3}>
                {completShopItems?.map((item) => (
                    <Grid item key={item.shopItemId} xs={12} sm={3}>
                        <Item item={item} handleAddToCart={handleAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </Wrapper>
    );


   
};
export default HomePage;
