import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { stateDefaultMock } from 'src/app/shared/mocks';
import { Product } from 'src/app/shared/models';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let controller: HttpTestingController;
  const expectedUrl = `http://localhost:8000/products`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductsService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getAll should return faked product from a fake object', () => {
    let productsToReturn: Product[] | undefined;

    const productsMock = stateDefaultMock.groceryRootStore.products;

    service.getAll().subscribe((products) => {
      productsToReturn = products;
    });
    const request = controller.expectOne(expectedUrl);
    request.flush(productsMock);

    expect(productsToReturn).toEqual(productsMock);
  });
});
