import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  Box,
  Pagination,
  IconButton,
  ButtonGroup,
} from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  addToCart,
  deleteAllItems,
  deleteFromCart,
  removeProduct,
} from '../store/reducers';
import usePagination from './Pagination';

function Checkout() {
  const cartItems = useSelector(state => state.cart?.cartItems);
  const totalCartValue = useSelector(state => state.cart?.totalCartValue);
  const dispatch = useDispatch();
  const PER_PAGE = 6;
  const count = Math.ceil(cartItems.length / PER_PAGE);
  const _DATA = usePagination(cartItems, PER_PAGE);
  const [page, setPage] = useState(1);

  const handlePageChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const emptyHandler = () => {
    dispatch(deleteAllItems());
  };

  const handleDelete = product => {
    dispatch(removeProduct(product.id));
  };

  const handleEditQuantity = (product, quantity) => {
    dispatch(addToCart({ product, quantity }));
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="1rem"
      >
        <Typography variant="h5" mb="1rem">
          Checkout
        </Typography>
        <Button
          onClick={emptyHandler}
          variant="contained"
          sx={{
            textTransform: 'none',
            backgroundColor: 'grey',
            '&:hover': {
              backgroundColor: '#e6e6e6',
              color: '#000',
            },
          }}
        >
          <Typography fontWeight="600">Empty Cart</Typography>
        </Button>
      </Box>
      <Box ml="1rem">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1100 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Actions</TableCell>
                <TableCell align="right">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_DATA?.currentData().map(cart => (
                <TableRow
                  key={cart?.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {cart?.id}
                  </TableCell>
                  <TableCell align="left">{cart?.title}</TableCell>
                  <TableCell align="right">$ {cart?.price}</TableCell>
                  <TableCell align="right">{cart?.quantity}</TableCell>
                  <TableCell align="right">
                    $ {cart?.quantity * cart?.price}
                  </TableCell>
                  <TableCell align="right">
                    <ButtonGroup size="small" aria-label="button-group">
                      <Button
                        disabled={cart.quantity <= 0}
                        onClick={() =>
                          handleEditQuantity(cart, cart.quantity - 1)
                        }
                      >
                        +
                      </Button>
                      <Button disabled>{cart.quantity}</Button>
                      <Button
                        disabled={cart.quantity >= cart.stock}
                        onClick={() => {
                          console.log(cart);
                          dispatch(
                            deleteFromCart({
                              product: cart,
                              quantity: cart.quantity - 1,
                            })
                          );
                        }}
                      >
                        -
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(cart)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow
                key="total"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Total
                </TableCell>
                <TableCell align="right"> </TableCell>
                <TableCell align="right"> </TableCell>
                <TableCell align="right"> </TableCell>
                <TableCell align="right">$ {totalCartValue}</TableCell>
                <TableCell align="right"> </TableCell>{' '}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box display="flex" justifyContent="end" mt="1rem">
        {cartItems?.length !== 0 && (
          <Pagination
            count={count}
            page={page}
            size="large"
            onChange={handlePageChange}
            color="primary"
          />
        )}
      </Box>
    </>
  );
}

export default Checkout;
