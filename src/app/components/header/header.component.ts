import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product, State } from 'src/app/models';
import { selectCart } from 'src/app/store/selectors';
import * as ProductsCartActions from '../../store/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cart$!: Observable<Product[]>;

  constructor(private store$: Store<State>) {}

  ngOnInit() {
    this.store$.dispatch(ProductsCartActions.FetchProducts());
    this.store$.dispatch(ProductsCartActions.FetchRates());
    this.cart$ = this.store$.pipe(select(selectCart));
  }
}
