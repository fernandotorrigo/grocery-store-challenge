import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Product, State } from 'src/app/models';
import * as ProductsCartActions from 'src/app/store/actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(private store: Store<State>, private formBuilder: FormBuilder) {}

  @Input() product!: Product;

  inCart = false;
  quantity = 1;

  ngOnInit() {}
  addToCart(product: Product) {
    this.store.dispatch(
      ProductsCartActions.AddToCart({ product: { ...product, quantity: 1 } })
    );
    this.inCart = true;
    this.quantity = 1;
  }

  removeFromCart(product: Product) {
    this.store.dispatch(
      ProductsCartActions.RemoveFromCart({
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
        ProductsCartActions.RemoveFromCart({
          product: { ...product, quantity: 0 },
        })
      );
    } else {
      this.store.dispatch(
        ProductsCartActions.UpdateQtdProductCart({
          product: { ...product, quantity: newQuantity },
        })
      );
    }
  }
}
