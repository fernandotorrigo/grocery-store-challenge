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

  /**
   * Function to set in the cart if the product received by parameter is in the cart
   *
   * @param {Cart[]} data
   *
   */
  setIsInCart(data: Cart[]): void {
    const item = data.filter((cart) => cart.id === this.product.id);
    if (item.length > 0) {
      this.inCart = true;
      this.quantity = item[0].quantity;
    }
  }

  /**
   * Function to add new item to cart
   *
   * @param {Product} product
   *
   */
  addToCart(product: Product): void {
    this.store$.dispatch(addToCart({ product: { ...product, quantity: 1 } }));
    this.inCart = true;
    this.quantity = 1;
  }

  /**
   * Function to remove item from cart
   *
   * @param {Product} product
   *
   */
  removeFromCart(product: Product): void {
    this.store$.dispatch(
      removeFromCart({
        product: { ...product, quantity: 0 },
      })
    );
    this.inCart = false;
  }

  /**
   * Function that update the product quantity on the cart
   *
   * @param {Product} product
   * @param {number} newQuantity
   *
   */
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
