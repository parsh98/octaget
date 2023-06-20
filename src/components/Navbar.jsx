import { Badge, Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import logo from '../assets/logo-octaget.webp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const Navbar = () => {
  const totalProductQuantity = useSelector(
    state => state.cart?.totalProductQuantity
  );
  const totalCartValue = useSelector(state => state.cart?.totalCartValue);

  return (
    <React.Fragment>
      <Box
        bgcolor={'#747574'}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: '14px',
        }}
        height={'8vh'}
      >
        <img src={logo} width={'130px'} alt="OCTAGET" />
        <Box display={'flex'} gap={'1rem'}>
          <Badge badgeContent={totalProductQuantity} color="primary">
            <ShoppingCartIcon />
          </Badge>
          <Box width={'8rem'}>
            <Typography>| Total : $ {totalCartValue}</Typography>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Navbar;
