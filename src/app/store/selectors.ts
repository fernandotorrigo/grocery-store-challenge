import { State } from '../models';

export const selectProducts = (state: State) => {
  return state.groceryRootStore.products;
};

export const selectCart = (state: State) => state.groceryRootStore.cart;

export const selectRates = (state: State) =>
  state.groceryRootStore.currencyData;
