import Button from '@material-ui/core/Button';
import * as React from 'react';
// Types
import { ICartItem } from '../HomePage';
// Styles
import { Wrapper } from './Item.styles';

type Props = {
  item: ICartItem;
  handleAddToCart: (clickedItem: ICartItem) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <Wrapper>
    <img src={item.imagePath} alt={item.title} style={{width:200, height: "auto"}}/>
    <div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <h3>${item.price}</h3>
    </div>
    <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
  </Wrapper>
);

export default Item;