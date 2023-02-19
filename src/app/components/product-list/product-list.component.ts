import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product, RootState } from 'src/app/shared/models';
import { selectProducts } from 'src/app/store/product/selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products$!: Observable<Product[]>;
  constructor(private store$: Store<RootState>) {}

  ngOnInit() {
    this.products$ = this.store$.select(selectProducts);
  }
}
