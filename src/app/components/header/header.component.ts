import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cart, RootState } from 'src/app/shared/models';
import { totalCart } from 'src/app/shared/utils';
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

  /**
   * Returns the cart total
   *
   * @returns {number}
   */
  get valueTotalCart(): number {
    return totalCart(this.cart);
  }
}
