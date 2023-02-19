import { createReducer, on } from '@ngrx/store';
import { RootState } from 'src/app/shared/models';
import {
  addToCart,
  removeFromCart,
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
    return {
      ...state,
      cart: [...state.cart, payload.product],
    };
  }),
  on(updateQtdProductCart, (state, payload) => {
    return {
      ...state,
      cart: [
        ...state.cart.map((item) => {
          return {
            ...item,
            quantity:
              item.id === payload.product.id
                ? payload.product.quantity
                : item.quantity,
          };
        }),
      ],
    };
  }),
  on(removeFromCart, (state, payload) => {
    return {
      ...state,
      cart: [...state.cart.filter((item) => item.id !== payload.product.id)],
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
  })
);
