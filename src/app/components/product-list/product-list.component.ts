import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product, State } from 'src/app/models';
import { selectProducts } from 'src/app/store/selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products$!: Observable<Product[]>;
  constructor(private store$: Store<State>) {}

  ngOnInit() {
    this.products$ = this.store$.select(selectProducts);
  }
}
