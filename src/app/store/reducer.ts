import { createReducer, on } from '@ngrx/store';
import { State } from 'src/app/shared/models';
import * as ProductsCartActions from './actions';

export const initialState: State = {
  groceryRootStore: {
    products: [],
    cart: [],
    currencyData: {},
  },
};

export const groceryRootStore = createReducer(
  initialState.groceryRootStore,
  on(ProductsCartActions.AddToCart, (state, payload) => {
    return {
      ...state,
      cart: [...state.cart, payload.product],
    };
  }),
  on(ProductsCartActions.UpdateQtdProductCart, (state, payload) => {
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
  on(ProductsCartActions.RemoveFromCart, (state, payload) => {
    return {
      ...state,
      cart: [...state.cart.filter((item) => item.id !== payload.product.id)],
    };
  }),
  on(ProductsCartActions.SetProducts, (state, payload) => {
    return {
      ...state,
      products: [...payload.products],
    };
  }),
  on(ProductsCartActions.SetRates, (state, payload) => {
    return {
      ...state,
      currencyData: { ...payload.currencyData },
    };
  })
);
