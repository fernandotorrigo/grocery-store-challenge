import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  switchMap,
} from 'rxjs/operators';
import { RatesService } from 'src/app/services/rates/rates.service';
import { Cart } from 'src/app/shared/models';
import { fetchRates, setRates } from '../rate/actions';
import { fetchCartFromSession, setCart } from './actions';

enum ErrorMsgs {
  FETCH_PRODUCTS = 'Unable to get products, we are working to resolve the issue as quickly as possible.',
  FETCH_RATES = 'Unable to get currency quotes, we are working to resolve the issue as quickly as possible.',
}

@Injectable()
export class CartStoreEffects {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  configSnackBar = {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
  };

  fetchCartFromSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchCartFromSession),
      map(() => {
        const dataSessionCart = sessionStorage.getItem('cart');
        try {
          if (!dataSessionCart) return [];
          const response: Cart[] = JSON.parse(dataSessionCart);
          return response;
        } catch (error) {
          return [];
        }
      }),
      map((products) => setCart({ products }))
    )
  );

  constructor(private actions$: Actions) {}
}
