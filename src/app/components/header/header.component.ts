import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cart, State } from 'src/app/shared/models';
import { selectCart } from 'src/app/store/selectors';
import * as ProductsCartActions from '../../store/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cart$!: Observable<Cart[]>;
  cart!: Cart[];

  constructor(private store$: Store<State>) {
    this.cart$ = this.store$.pipe(select(selectCart));
  }

  ngOnInit() {
    this.store$.dispatch(ProductsCartActions.FetchProducts());
    this.store$.dispatch(ProductsCartActions.FetchRates());
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
