import { createReducer, on } from '@ngrx/store';
import { RootState } from 'src/app/shared/models';
import {
  addToCart,
  removeFromCart,
  setCart,
  updateQtdProductCart,
} from './cart/actions';
import { setProducts } from './product/actions';
import { setRates } from './rate/actions';

export const initialState: RootState = {
  groceryRootStore: {
    products: [],
    cart: [],
    currencyData: {},
  },
};

export const groceryRootStore = createReducer(
  initialState.groceryRootStore,
  on(addToCart, (state, payload) => {
    const cart = [...state.cart, payload.product];
    sessionStorage.setItem('cart', JSON.stringify(cart));

    return {
      ...state,
      cart,
    };
  }),
  on(updateQtdProductCart, (state, payload) => {
    const cart = [
      ...state.cart.map((item) => {
        return {
          ...item,
          quantity:
            item.id === payload.product.id
              ? payload.product.quantity
              : item.quantity,
        };
      }),
    ];
    sessionStorage.setItem('cart', JSON.stringify(cart));

    return {
      ...state,
      cart,
    };
  }),
  on(removeFromCart, (state, payload) => {
    const cart = [
      ...state.cart.filter((item) => item.id !== payload.product.id),
    ];
    sessionStorage.setItem('cart', JSON.stringify(cart));

    return {
      ...state,
      cart,
    };
  }),
  on(setProducts, (state, payload) => {
    return {
      ...state,
      products: [...payload.products],
    };
  }),
  on(setRates, (state, payload) => {
    return {
      ...state,
      currencyData: { ...payload.currencyData },
    };
  }),
  on(setCart, (state, payload) => {
    return {
      ...state,
      cart: [...payload.products],
    };
  })
);
