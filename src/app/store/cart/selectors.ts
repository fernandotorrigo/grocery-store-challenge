import { RootState } from 'src/app/shared/models';

export const selectCart = (state: RootState) => state.groceryRootStore.cart;
