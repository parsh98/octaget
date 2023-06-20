import React, { useEffect } from 'react';
import { Box, Grid, Pagination, Typography } from '@mui/material';
import usePagination from './Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { storeProductList } from '../store/reducers';
import Product from './Product';
import axios from 'axios';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.cart.productList);
  const PER_PAGE = 6;
  const count = Math.ceil(products.length / PER_PAGE);
  const _DATA = usePagination(products, PER_PAGE);
  let [page, setPage] = React.useState(1);
  const handlePageChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    axios
      .get('https://dummyjson.com/products')
      .then(res => {
        if (res.data.products.length !== 0) {
          dispatch(storeProductList(res.data.products));
        }
      })
      .catch(err => {
        alert(err);
      });
  }, [dispatch]);

  return (
    <React.Fragment>
      <Grid container minHeight={'76vh'}>
        {products?.length !== 0 ? (
          _DATA?.currentData().map(item => {
            return (
              <Grid item md={4} key={item.id}>
                <Product product={item} />
              </Grid>
            );
          })
        ) : (
          <Box
            sx={{
              ml: '70%',
              minWidth: '100%',
              mt: '50%',
            }}
          >
            <Typography variant="h3">No Products Available</Typography>
          </Box>
        )}
      </Grid>
      <Box display={'flex'} justifyContent={'end'}>
        {products?.length !== 0 ? (
          <Pagination
            count={count}
            page={page}
            size="large"
            onChange={handlePageChange}
            color="primary"
          />
        ) : (
          ''
        )}
      </Box>
    </React.Fragment>
  );
};

export default ProductList;
