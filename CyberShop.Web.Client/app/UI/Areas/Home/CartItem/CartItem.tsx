import Button from '@material-ui/core/Button';
import * as React from 'react';
// Types
import { ICartItem } from '../HomePage';
// Styles
import { Wrapper } from './CartItem.styles';

interface CartItemProps {
  item: ICartItem;
  addToCart: (clickedItem: ICartItem) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<CartItemProps> = ({ item, addToCart, removeFromCart }) => (
  <Wrapper>
    <div>
      <h3>{item.title}</h3>
      <div className='information'>
        <p>Price: ${item.price}</p>
        <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
      </div>
      <div className='buttons'>
        <Button
          size='small'
          disableElevation
          variant='contained'
          onClick={() => removeFromCart(item.shopItemId)}
        >
          -
        </Button>
        <p>{item.amount}</p>
        <Button
          size='small'
          disableElevation
          variant='contained'
          onClick={() => addToCart(item)}
        >
          +
        </Button>
      </div>
    </div>
    <img src={item.imagePath} alt={item.title} />
  </Wrapper>
);

export default CartItem;