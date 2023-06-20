import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../store/reducers';

function Product({ product }) {
  const { title, price, description, stock, id, images } = product;

  const dispatch = useDispatch();
  const cartItem = useSelector(state =>
    state.cart.cartItems.find(item => item.id === id)
  );
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    if (quantity < stock) {
      dispatch(addToCart({ product, quantity: quantity + 1 }));
    }
  };

  const handleDeleteFromCart = () => {
    if (quantity > 0) {
      dispatch(deleteFromCart({ product, quantity: quantity - 1 }));
    }
  };

  return (
    <Box
      key={id}
      sx={{
        border: '2px solid #e6e6e6',
        borderRadius: '5px',
        maxWidth: '20rem',
        minHeight: '12rem',
        p: '1rem',
        mb: '2rem',
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5">
          {title.length > 12 ? `${title.slice(0, 12)}...` : title}
        </Typography>
        <Typography variant="p">Avail Qty: {stock}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" gap="1rem">
        <Stack spacing={2}>
          <Tooltip title={description} placement="top" arrow>
            <Typography variant="p">
              Description:
              {description.length > 60
                ? `${description.slice(0, 60)}...`
                : description}
            </Typography>
          </Tooltip>
          <Box>
            <ButtonGroup size="small" aria-label="button-group">
              <Button disabled={quantity >= stock} onClick={handleAddToCart}>
                +
              </Button>

              <Button disabled>{quantity}</Button>

              <Button disabled={quantity <= 0} onClick={handleDeleteFromCart}>
                -
              </Button>
            </ButtonGroup>
          </Box>
        </Stack>
        <img src={images[0]} width="120px" height="150px" alt={title} />
      </Box>
      <Box>
        <Typography variant="p">Price: ${price}</Typography>
      </Box>
    </Box>
  );
}

export default Product;
