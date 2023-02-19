import { createAction, props } from '@ngrx/store';
import { Cart } from 'src/app/shared/models';

export const addToCart = createAction(
  '[Cart] Add to cart',
  props<{ product: Cart }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove from cart',
  props<{ product: Cart }>()
);

export const updateQtdProductCart = createAction(
  '[Cart] Update quantity product on cart',
  props<{ product: Cart }>()
);

export const fetchCartFromSession = createAction(
  '[Cart] Fetch cart from session storage'
);

export const setCart = createAction(
  '[Cart] Set cart',
  props<{ products: Cart[] }>()
);
