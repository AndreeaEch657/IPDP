import { Button, List, ListItem, ListItemText, makeStyles, Typography } from '@material-ui/core';
import * as React from 'react';
import { useEffect, useState } from 'react';
import TransactionService from '../../../Services/TransactionService';

interface OrderItemsPageProps{
    orderItemId: number;
    onBackButtonClick: () => void;
    address: string;

}

interface OrderItem{
    title: string;
    imagePath:string;
    amount: number;
    price: number;
}

const useStyles = makeStyles((theme) => ({
    listItem: {
      padding: theme.spacing(1, 0),
    },
    total: {
      fontWeight: 700,
    },
    title: {
      marginTop: theme.spacing(2),
    },
    image:{
        width: "120px",
        height: "auto"
    }
  }));
  

export const OrderItemsPage: React.FunctionComponent<OrderItemsPageProps> = (props) =>{
    const classes = useStyles();
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

    useEffect(() =>{
        TransactionService.getOrderItems(props.orderItemId)
            .then(resp =>{
                console.log(resp.data);
                setOrderItems(resp.data);
            })
            .catch(err =>{
                console.log(err.message);
            })

    },[])

    const calculateTotal = (items: OrderItem[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

    return(
        <div>
    
            <List disablePadding>
                    {orderItems.map((product) => (
                    <ListItem className={classes.listItem} key={product.title}>
                        <img src={product.imagePath} alt={product.title} className={classes.image}/>
                        <ListItemText primary={product.title} />
                        <Typography variant="body2">{product.price} * {product.amount}</Typography>
                    </ListItem>
                    ))}
                    <ListItem className={classes.listItem}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" className={classes.total}>
                        ${calculateTotal(orderItems).toFixed(2)}
                    </Typography>
                    </ListItem>

                    <ListItem>
                    <Typography variant="body1">Delivering to {props.address}</Typography>
                    </ListItem>
                    
                </List>

            <Button onClick={() => props.onBackButtonClick()}>BACK</Button>
        </div>
    )

}