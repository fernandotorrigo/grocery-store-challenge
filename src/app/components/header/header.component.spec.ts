import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed
} from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { skip } from 'rxjs';
import { initialStateMock } from 'src/app/shared/mocks';
import { RootState } from 'src/app/shared/models';
import { fetchCartFromSession } from 'src/app/store/cart/actions';
import { fetchProducts } from 'src/app/store/product/actions';
import { fetchRates } from 'src/app/store/rate/actions';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore<RootState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [provideMockStore({ initialState: initialStateMock })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should dispatch [fetchProducts, fetchRates, fetchCartFromSession]', () => {
    store.scannedActions$
      .pipe(skip(1))
      .subscribe((scannedAction) =>
        expect(scannedAction).toEqual(fetchProducts())
      );
    store.scannedActions$
      .pipe(skip(1))
      .subscribe((scannedAction) =>
        expect(scannedAction).toEqual(fetchRates())
      );
    store.scannedActions$
      .pipe(skip(1))
      .subscribe((scannedAction) =>
        expect(scannedAction).toEqual(fetchCartFromSession())
      );
  });

  it('Should return the total cart = 4.2', fakeAsync(() => {
    const cartMock: RootState = {
      groceryRootStore: {
        ...initialStateMock.groceryRootStore,
        cart: [
          {
            id: 2,
            quantity: 5,
            name: 'Eggs',
            price: 2.1,
            image: '/assets/images/eggs.png',
            description: 'Eggs per dozen',
          },
        ],
      },
    };

    store.setState(cartMock);
    store.refreshState();
    flush();

    expect(component.totalCart).toBe(10.5);
  }));

  it('Should return the total cart = 0', fakeAsync((done: any) => {
    const cartEmpty = {
      groceryRootStore: {
        products: [],
        currencyData: {
          BRL: 123,
        },
        cart: [],
      },
    };

    store.setState(cartEmpty);
    store.refreshState();
    flush();

    expect(component.totalCart).toBe(0);
  }));
});
