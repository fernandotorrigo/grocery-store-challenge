import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialStateMock, stateDefaultMock } from 'src/app/shared/mocks';
import { Cart, RootState } from 'src/app/shared/models';
import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let store: MockStore<RootState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [FormsModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideMockStore({ initialState: initialStateMock })],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should be in cart the product with index 1', fakeAsync(() => {
    const currentProduct = stateDefaultMock.groceryRootStore.products[1];
    component.product = currentProduct;
    fixture.detectChanges();

    store.setState(stateDefaultMock);
    store.refreshState();
    flush();

    expect(component.inCart).toBe(true);
  }));

  it('Should not be in cart the product with index 3', fakeAsync(() => {
    const currentProduct = stateDefaultMock.groceryRootStore.products[3];
    component.product = currentProduct;
    fixture.detectChanges();

    store.setState(stateDefaultMock);
    store.refreshState();
    flush();

    expect(component.inCart).toBe(false);
  }));

  it('Should add in cart the product with index 3', fakeAsync(() => {
    const currentProduct = stateDefaultMock.groceryRootStore.products[3];
    component.product = currentProduct;
    fixture.detectChanges();

    component.addToCart(currentProduct);
    store.refreshState();
    flush();

    expect(component.inCart).toBe(true);
    expect(component.quantity).toBe(1);
  }));

  it('Should remove from cart the product with index 1', fakeAsync(() => {
    const currentProductToRemove =
      stateDefaultMock.groceryRootStore.products[0];

    const newState = {
      groceryRootStore: {
        ...stateDefaultMock.groceryRootStore,
        cart: stateDefaultMock.groceryRootStore.cart.filter(
          (item) => item.id !== currentProductToRemove.id
        ),
      },
    };

    component.product = currentProductToRemove;
    store.setState(newState);
    store.refreshState();
    flush();

    component.removeFromCart(currentProductToRemove);

    component.cart$.subscribe((cart) => {
      const itemIsInCart = cart.filter(
        (item) => item.id === currentProductToRemove.id
      );
      expect(itemIsInCart).toHaveSize(0);
    });

    expect(component.inCart).toBe(false);
  }));

  it('Should update the quantity in cart on the product with index 0', fakeAsync(() => {
    const newQtd = 4;
    const currentProduct = stateDefaultMock.groceryRootStore.products[0];
    component.product = currentProduct;

    const defaultCart: Cart[] = stateDefaultMock.groceryRootStore.cart;
    const newCart = defaultCart.map((data) => {
      return {
        ...data,
        quantity: currentProduct.id === data.id ? newQtd : data.quantity,
      };
    });

    const currentState = {
      groceryRootStore: {
        ...stateDefaultMock.groceryRootStore,
        cart: newCart,
      },
    };
    component.updateQuantity(4, currentProduct);
    store.setState(currentState);
    store.refreshState();
    flush();

    component.cart$.subscribe((cart) => {
      expect(
        cart.filter((item) => item.id === currentProduct.id)[0].quantity
      ).toEqual(4);
    });

    expect(component.inCart).toBe(true);
    expect(component.quantity).toBe(4);
  }));
});
