import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { ICartItem } from '../HomePage';
import { useEffect, useState } from 'react';

const products = [
  { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
  { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
  { name: 'Product 3', desc: 'Something else', price: '$6.51' },
  { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
  { name: 'Shipping', desc: '', price: 'Free' },
];
const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

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
}));

interface ReviewProps {
  fullName: string,
  cardType:string,
  cardHolder:string, 
  cardNumber:string,
  expiryDate:string,
  address:string[],

}

export const Review:React.FunctionComponent<ReviewProps> = (props) => {
  const classes = useStyles();
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  useEffect(() =>{
    setCartItems(JSON.parse(localStorage.getItem("cartItems")) ? JSON.parse(localStorage.getItem("cartItems")) as any : []);
  }, [])


  const calculateTotal = (items: ICartItem[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartItems.map((product) => (
          <ListItem className={classes.listItem} key={product.title}>
            <ListItemText primary={product.title} secondary={product.description} />
            <Typography variant="body2">{product.price} * {product.amount}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {calculateTotal(cartItems).toFixed(2)} RON
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{props.fullName}</Typography>
          <Typography gutterBottom>{props.address.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
              <React.Fragment key={props.cardType}>
                <Grid item xs={6}>
                  <Typography gutterBottom>Card Type</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{props.cardType}</Typography>
                </Grid>
           
                <Grid item xs={6}>
                  <Typography gutterBottom>Card Holder</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{props.cardHolder}</Typography>
                </Grid>
              </React.Fragment>

              <React.Fragment key={props.cardNumber}>
                <Grid item xs={6}>
                  <Typography gutterBottom>Card Number</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>XXXX - XXXX - XXXX - {props.cardNumber.slice(props.cardNumber.length - 4, props.cardNumber.length)}</Typography>
                </Grid>
              </React.Fragment>

              <React.Fragment key={props.expiryDate}>
                <Grid item xs={6}>
                  <Typography gutterBottom>Card Expiry Date</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{props.expiryDate}</Typography>
                </Grid>
              </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}