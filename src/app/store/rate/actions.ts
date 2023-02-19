import { createAction, props } from '@ngrx/store';
import { Quotes } from 'src/app/shared/models';

export const setRates = createAction(
  '[Rates] Set rates',
  props<{ currencyData: Quotes }>()
);

export const fetchRates = createAction('[Rates] Fetch rates from server');
