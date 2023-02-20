import { RootState } from '../models';

export const initialStateMock: RootState = {
  groceryRootStore: {
    products: [],
    currencyData: {
      BRL: 123,
    },
    cart: [],
  },
};
