import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Product, RootState } from 'src/app/shared/models';
import {
  addToCart,
  removeFromCart,
  updateQtdProductCart,
} from 'src/app/store/cart/actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(private store: Store<RootState>, private formBuilder: FormBuilder) {}

  @Input() product!: Product;

  inCart = false;
  quantity = 1;

  ngOnInit() {}
  addToCart(product: Product) {
    this.store.dispatch(addToCart({ product: { ...product, quantity: 1 } }));
    this.inCart = true;
    this.quantity = 1;
  }

  removeFromCart(product: Product) {
    this.store.dispatch(
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
      this.store.dispatch(
        removeFromCart({
          product: { ...product, quantity: 0 },
        })
      );
    } else {
      this.store.dispatch(
        updateQtdProductCart({
          product: { ...product, quantity: newQuantity },
        })
      );
    }
  }
}
