import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productList: [],
  cartItems: [],
  totalCartValue: 0,
  totalProductQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    storeProductList: (state, action) => {
      state.productList = action.payload;
    },
    addToCart: (state, action) => {
      const { product } = action.payload;
      const existingProductIndex = state.cartItems.findIndex(
        item => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        const existingProduct = state.cartItems[existingProductIndex];
        if (existingProduct.quantity < existingProduct.stock) {
          existingProduct.quantity += 1;
        }
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }

      const productListIndex = state.productList.findIndex(
        item => item.id === product.id
      );
      if (productListIndex !== -1) {
        const productInList = state.productList[productListIndex];
        if (productInList.quantity < productInList.stock) {
          state.productList[productListIndex] = {
            ...productInList,
            quantity: productInList.quantity + 1,
          };
        }
      }

      updateCartValues(state);
    },

    deleteFromCart: (state, action) => {
      const { product } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        item => item?.id === product?.id
      );
      if (existingItemIndex !== -1) {
        const existingItem = state.cartItems[existingItemIndex];
        const updatedQuantity = existingItem.quantity - 1;
        if (updatedQuantity > 0) {
          state.cartItems[existingItemIndex] = {
            ...existingItem,
            quantity: updatedQuantity,
          };
        } else {
          state.cartItems.splice(existingItemIndex, 1);
        }

        const productListIndex = state.productList.findIndex(
          item => item.id === product.id
        );
        if (productListIndex !== -1) {
          state.productList[productListIndex] = {
            ...state.productList[productListIndex],
            quantity: state.productList[productListIndex].quantity - 1,
          };
        }
      }

      updateCartValues(state);
    },

    deleteAllItems: state => {
      state.cartItems = [];
      state.totalCartValue = 0;
      state.totalProductQuantity = 0;
    },
    removeProduct: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== productId);

      const productListIndex = state.productList.findIndex(
        item => item.id === productId
      );
      if (productListIndex !== -1) {
        state.productList[productListIndex] = {
          ...state.productList[productListIndex],
          quantity: 0,
        };
      }

      updateCartValues(state);
    },
  },
});

const updateCartValues = state => {
  state.totalCartValue = state.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  state.totalProductQuantity = state.cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
};

export const {
  addToCart,
  removeProduct,
  deleteFromCart,
  deleteAllItems,
  storeProductList,
} = cartSlice.actions;

export default cartSlice.reducer;
