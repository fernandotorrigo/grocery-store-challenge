import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cart, Product, RootState } from 'src/app/shared/models';
import {
  addToCart,
  removeFromCart,
  updateQtdProductCart,
} from 'src/app/store/cart/actions';
import { selectCart } from 'src/app/store/cart/selectors';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  cart$!: Observable<Cart[]>;
  form: FormGroup = new FormGroup({});

  constructor(private store$: Store<RootState>) {
    this.cart$ = this.store$.pipe(select(selectCart));
  }

  @Input() product!: Product;

  inCart = false;
  quantity = 1;

  ngOnInit() {
    this.cart$.subscribe((data) => {
      this.setIsInCart(data);
    });
  }

  setIsInCart(data: Cart[]): void {
    const item = data.filter((cart) => cart.id === this.product.id);
    if (item.length > 0) {
      this.inCart = true;
      this.quantity = item[0].quantity;
    }
  }

  addToCart(product: Product) {
    this.store$.dispatch(addToCart({ product: { ...product, quantity: 1 } }));
    this.inCart = true;
    this.quantity = 1;
  }

  removeFromCart(product: Product) {
    this.store$.dispatch(
      removeFromCart({
        product: { ...product, quantity: 0 },
      })
    );
    this.inCart = false;
  }

  updateQuantity(newQuantity: number, product: Product): void {
    this.quantity = newQuantity;

    if (newQuantity === 0) {
      this.inCart = false;
      this.store$.dispatch(
        removeFromCart({
          product: { ...product, quantity: 0 },
        })
      );
    } else {
      this.store$.dispatch(
        updateQtdProductCart({
          product: { ...product, quantity: newQuantity },
        })
      );
    }
  }
}
