import { createAction, props } from '@ngrx/store';
import { Cart, Product, Quotes } from 'src/app/shared/models';

// Defining actions for interacting with a piece of state.
export const AddToCart = createAction(
  '[Cart] Add to cart',
  props<{ product: Cart }>()
);
export const RemoveFromCart = createAction(
  '[Cart] Remove from cart',
  props<{ product: Cart }>()
);
export const UpdateQtdProductCart = createAction(
  '[Cart] Update quantity product on cart',
  props<{ product: Cart }>()
);

export const FetchProducts = createAction(
  '[Product] Fetch products from server'
);
export const SetProducts = createAction(
  '[Product] Set products',
  props<{ products: Product[] }>()
);

export const SetRates = createAction(
  '[Rates] Set rates',
  props<{ currencyData: Quotes }>()
);
export const FetchRates = createAction('[Rates] Fetch rates from server');
