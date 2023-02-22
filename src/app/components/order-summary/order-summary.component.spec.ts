import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialStateMock } from 'src/app/shared/mocks';
import { RootState } from 'src/app/shared/models';
import { OrderSummaryComponent } from './order-summary.component';

describe('OrderSummaryComponent', () => {
  let component: OrderSummaryComponent;
  let fixture: ComponentFixture<OrderSummaryComponent>;
  let store: MockStore<RootState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderSummaryComponent],
      imports: [ReactiveFormsModule, MatAutocompleteModule],
      providers: [provideMockStore({ initialState: initialStateMock })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderSummaryComponent);
    component = fixture.componentInstance;
    store = TestBed.get<Store>(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should return the total cart = 0', fakeAsync(() => {
    const cartEmpty = {
      groceryRootStore: {
        products: [],
        currencyData: {
          GBPBRL: 6.222417,
          GBPUSD: 1.2044,
        },
        cart: [],
      },
    };

    store.setState(cartEmpty);
    store.refreshState();
    flush();

    expect(component.valueTotalCart).toBe(0);
  }));

  it('Should set currency to GBPBRL and return R$65.34 on total to pay', fakeAsync(() => {
    const cartMock = {
      groceryRootStore: {
        products: [],
        currencyData: {
          GBPBRL: 6.222417,
          GBPUSD: 1.2044,
        },
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

    component.codeCurrency = 'BRL';
    component.currentCurrency.setValue({
      name: 'GBPBRL',
      value: 2,
    });
    component.setShowOrderSummary();
    fixture.detectChanges();
    const spanTotalTopay = fixture.debugElement.query(By.css('#total-to-pay'));

    expect(spanTotalTopay.nativeElement.innerHTML).toBe('R$65.34');
    expect(component.totalCartConverted).toBe(65.3353785);
  }));
});
