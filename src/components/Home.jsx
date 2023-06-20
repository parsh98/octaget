import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Typography, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SettingsIcon from '@mui/icons-material/Settings';
import Navbar from './Navbar';
import ProductList from './ProductList';
import Checkout from './Checkout';

const styles = {
  defaultTab: {
    color: '#000',
    backgroundColor: '#e3e3e3',
    fontWeight: 400,
  },
  activeTab: {
    backgroundColor: '#fff',
  },
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function VerticalTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getTabStyle = index => {
    return value === index
      ? { ...styles.defaultTab, ...styles.activeTab }
      : styles.defaultTab;
  };

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
          height: '92vh',
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          TabIndicatorProps={{
            sx: {
              left: 0,
              background: '#000',
              width: '3px',
            },
          }}
          sx={{
            borderRight: 1,
            borderColor: '#fff',
            bgcolor: '#e3e3e3',
            minWidth: '15rem',
          }}
        >
          <Tab
            disableRipple
            style={getTabStyle(0)}
            sx={{ alignItems: 'start', textTransform: 'none' }}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <HomeIcon sx={{ marginRight: '0.5rem' }} />
                Home
              </Box>
            }
          />
          <Tab
            disableRipple
            style={getTabStyle(1)}
            sx={{ alignItems: 'start', textTransform: 'none' }}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ShoppingBasketIcon sx={{ marginRight: '0.5rem' }} />
                Checkout
              </Box>
            }
          />
          <Tab
            disableRipple
            style={getTabStyle(2)}
            sx={{ alignItems: 'start', textTransform: 'none' }}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SettingsIcon sx={{ marginRight: '0.5rem' }} />
                Settings
              </Box>
            }
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <ProductList />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Checkout />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </Box>
  );
}

export default VerticalTabs;
