import { createAction, props } from '@ngrx/store';
import { Cart, Product, Quotes } from 'src/app/shared/models';

export const fetchProducts = createAction(
  '[Product] Fetch products from server'
);

export const setProducts = createAction(
  '[Product] Set products',
  props<{ products: Product[] }>()
);
