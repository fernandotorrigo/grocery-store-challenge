import { RootState } from 'src/app/shared/models';

export const selectProducts = (state: RootState) => {
  return state.groceryRootStore.products;
};
