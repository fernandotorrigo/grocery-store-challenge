import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products/products.service';
import { fetchProducts, setProducts } from './actions';

enum ErrorMsgs {
  FETCH_PRODUCTS = 'Unable to get products, we are working to resolve the issue as quickly as possible.',
  FETCH_RATES = 'Unable to get currency quotes, we are working to resolve the issue as quickly as possible.',
}

@Injectable()
export class ProductsStoreEffects {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  configSnackBar = {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
  };

  fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchProducts),
      exhaustMap(() => {
        return this.productsService.getAll().pipe(
          map((products) => {
            if (!products) {
              this._snackBar.open(
                ErrorMsgs.FETCH_PRODUCTS,
                'Close',
                this.configSnackBar
              );
            }
            return setProducts({ products });
          }),
          catchError(() => {
            this._snackBar.open(
              ErrorMsgs.FETCH_PRODUCTS,
              'Close',
              this.configSnackBar
            );
            return EMPTY;
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private _snackBar: MatSnackBar
  ) {}
}
