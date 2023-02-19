import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import * as ProductsCartActions from './actions';

import { ProductsService } from '../services/products/products.service';
import { RatesService } from '../services/rates/rates.service';

@Injectable()
export class RootStoreEffects {
  FetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsCartActions.FetchProducts),
      exhaustMap(() => {
        return this.productsService.getAll().pipe(
          map((products) => ProductsCartActions.SetProducts({ products })),
          catchError(() => EMPTY)
        );
      })
    )
  );

  FetchRates = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsCartActions.FetchRates),
      exhaustMap(() => {
        return this.ratesService.getCurrencyData().pipe(
          map((currencyData) =>
            ProductsCartActions.SetRates({ currencyData: currencyData.quotes })
          ),
          catchError(() => EMPTY)
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private ratesService: RatesService
  ) {}
}
