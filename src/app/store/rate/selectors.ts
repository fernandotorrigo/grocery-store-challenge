import { RootState } from 'src/app/shared/models';

export const selectRates = (state: RootState) =>
  state.groceryRootStore.currencyData;
