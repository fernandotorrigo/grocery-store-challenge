import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { Cart } from 'src/app/shared/models';
import { fetchCartFromSession, setCart } from './actions';

enum ErrorMsgs {
  FETCH_CART = 'Unable to get the cart, we are working to resolve the issue as quickly as possible.',
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
          this._snackBar.open(
            ErrorMsgs.FETCH_CART,
            'Close',
            this.configSnackBar
          );
          return [];
        }
      }),
      map((products) => setCart({ products }))
    )
  );

  constructor(private actions$: Actions, private _snackBar: MatSnackBar) {}
}
