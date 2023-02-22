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
import { totalCart } from 'src/app/shared/utils';
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

  /**
   * Returns the cart total
   *
   * @returns {number}
   */
  get valueTotalCart(): number {
    return totalCart(this.cart);
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

  /**
   * Returns the option formated
   * @param {OptionsCurrency} currency
   *
   * @returns {string}
   */
  displayOptionFormated(currency: OptionsCurrency): string {
    return currency && currency.name ? currency.name : '';
  }

  /**
   * Returns array with the data filtered by name
   * @param {string} name
   *
   * @returns {OptionsCurrency[]}
   */
  updateDataFiltered(name: string): OptionsCurrency[] {
    return this.filterDataSelected(name);
  }

  /**
   * Returns array with the data filtered by name toLocaleLowerCase
   * @param {string} name
   *
   * @returns {OptionsCurrency[]}
   */
  private filterDataSelected(name: string): OptionsCurrency[] {
    return this.rates.filter((item) =>
      item.name.toLowerCase().includes(name.toLocaleLowerCase())
    );
  }

  /**
   * Returns the cart total converting with the current quotation
   *
   * @returns {number}
   */
  get totalCartConverted(): number {
    let totalValueConverted = 0;
    const currencySeleted = this.currentCurrency.value as OptionsCurrency;

    if (currencySeleted.name) {
      const valueCurrentCurrency = this.filterDataSelected(
        currencySeleted.name
      );
      if (valueCurrentCurrency.length > 0) {
        totalValueConverted =
          this.valueTotalCart * valueCurrentCurrency[0].value;
        this.codeCurrency = valueCurrentCurrency[0].name.slice(3);
      }
    } else {
      totalValueConverted = this.valueTotalCart;
    }

    return totalValueConverted;
  }

  /**
   * Function void to show or not order summary
   *
   */
  setShowOrderSummary() {
    this.showOrderSummary = !this.showOrderSummary;
  }
}
