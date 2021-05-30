
import { Wrapper } from './Cart.styles';
import * as React from 'react';
import { ICartItem } from '../HomePage';
import CartItem from '../CartItem/CartItem';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface CartProps  {
  cartItems: ICartItem[];
  addToCart: (clickedItem: ICartItem) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<CartProps> = ({ cartItems, addToCart, removeFromCart }) => {
  const calculateTotal = (items: ICartItem[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);


  const onProceedToCheckoutClick = () =>{
    console.log(JSON.stringify (cartItems));
  }

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map(item => (
        <CartItem
          key={item.shopItemId}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: {calculateTotal(cartItems).toFixed(2)}</h2>
      {cartItems.length === 0 ? null : <Button><Link to="/checkout">Proceed to checkout </Link></Button>}

      
    </Wrapper>
  );
};

export default Cart;