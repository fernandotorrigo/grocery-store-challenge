import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  Cart,
  OptionsCurrency,
  Quotes,
  RootState,
} from 'src/app/shared/models';
import { selectCart } from 'src/app/store/cart/selectors';
import { selectRates } from 'src/app/store/rate/selectors';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent {
  filteredOptions$!: Observable<OptionsCurrency[]>;
  currentCurrency = new FormControl<string | OptionsCurrency>('');

  cart$!: Observable<Cart[]>;

  rates$!: Observable<Quotes>;

  cart: Cart[] = [];

  rates: OptionsCurrency[] = [];

  codeCurrency: string = 'GBP';

  showOrderSummary = false;

  get totalCart(): number {
    const sumWithInitial = this.cart.reduce(
      (accumulator, currentValue) => {
        const { quantity, price } = currentValue;
        const itemTotal = quantity * price;

        accumulator.total += itemTotal;
        return accumulator;
      },
      { total: 0 }
    );
    return sumWithInitial.total;
  }

  constructor(private store$: Store<RootState>) {
    this.cart$ = this.store$.select(selectCart);
    this.rates$ = this.store$.select(selectRates);
  }

  ngOnInit() {
    this.cart$.subscribe((data) => {
      this.cart = data;
    });

    this.rates$
      .pipe(
        map((data) => {
          const keys = Object.keys(data);
          const currencyOptions = keys.map((item) => {
            return {
              name: item,
              value: data[item],
            };
          });
          this.rates = currencyOptions;

          return currencyOptions;
        }),
        map(() => {
          this.filteredOptions$ = this.currentCurrency.valueChanges.pipe(
            startWith(''),
            map((value) => {
              const name = typeof value === 'string' ? value : value?.name;
              return name
                ? this.updateDataFiltered(name as string)
                : this.rates.slice();
            })
          );
        })
      )
      .subscribe();
  }

  displayFn(currency: OptionsCurrency): string {
    return currency && currency.name ? currency.name : '';
  }

  private updateDataFiltered(name: string): OptionsCurrency[] {
    return this.filterDataSelected(name);
  }

  private filterDataSelected(name: string): OptionsCurrency[] {
    return this.rates.filter((item) =>
      item.name.toLowerCase().includes(name.toLocaleLowerCase())
    );
  }

  get totalCartConverted(): number {
    let totalValueConverted = 0;
    const currencySeleted = this.currentCurrency.value as OptionsCurrency;

    if (currencySeleted.name) {
      const valueCurrentCurrency = this.filterDataSelected(
        currencySeleted.name
      );
      if (valueCurrentCurrency.length > 0) {
        totalValueConverted = this.totalCart * valueCurrentCurrency[0].value;
        this.codeCurrency = valueCurrentCurrency[0].name.slice(3);
      }
    } else {
      totalValueConverted = this.totalCart;
    }

    return totalValueConverted;
  }

  setShowOrderSummary() {
    this.showOrderSummary = !this.showOrderSummary;
  }
}
