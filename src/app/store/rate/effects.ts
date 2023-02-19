import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { RatesService } from 'src/app/services/rates/rates.service';
import { fetchRates, setRates } from './actions';

enum ErrorMsgs {
  FETCH_PRODUCTS = 'Unable to get products, we are working to resolve the issue as quickly as possible.',
  FETCH_RATES = 'Unable to get currency quotes, we are working to resolve the issue as quickly as possible.',
}

@Injectable()
export class RateStoreEffects {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  configSnackBar = {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
  };

  FetchRates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchRates),
      exhaustMap(() => {
        return this.ratesService.getCurrencyData().pipe(
          map((currencyData) => {
            if (!currencyData.quotes) {
              this._snackBar.open(
                ErrorMsgs.FETCH_RATES,
                'Close',
                this.configSnackBar
              );
            }

            return setRates({
              currencyData: currencyData.quotes,
            });
          }),
          catchError(() => {
            console.log('entrou aqui ');
            this._snackBar.open(
              ErrorMsgs.FETCH_RATES,
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
    private ratesService: RatesService,
    private _snackBar: MatSnackBar
  ) {}
}
