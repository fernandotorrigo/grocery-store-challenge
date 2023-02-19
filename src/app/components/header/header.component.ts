import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cart, RootState } from 'src/app/shared/models';
import { fetchCartFromSession } from 'src/app/store/cart/actions';
import { selectCart } from 'src/app/store/cart/selectors';
import { fetchProducts } from 'src/app/store/product/actions';
import { fetchRates } from 'src/app/store/rate/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cart$!: Observable<Cart[]>;
  cart!: Cart[];

  constructor(private store$: Store<RootState>) {
    this.cart$ = this.store$.pipe(select(selectCart));
  }

  ngOnInit() {
    this.store$.dispatch(fetchProducts());
    this.store$.dispatch(fetchRates());
    this.store$.dispatch(fetchCartFromSession());

    this.cart$.subscribe((data) => {
      this.cart = data;
    });
  }

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
}
