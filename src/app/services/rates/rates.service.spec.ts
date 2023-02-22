import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ratestMock } from 'src/app/shared/mocks';
import { envData, Rates } from 'src/app/shared/models';
import { RatesService } from './rates.service';

describe('RatesService', () => {
  let service: RatesService;
  let controller: HttpTestingController;
  const baseApi = envData.BASE_API || `http://localhost:8000`;
  const expectedUrl = `${baseApi}/rates`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RatesService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getAll should return faked rates from a fake object', () => {
    let ratesToReturn: Rates | undefined;

    const ratestMocked = ratestMock;

    service.getCurrencyData().subscribe((rates) => {
      ratesToReturn = rates;
    });
    const request = controller.expectOne(expectedUrl);
    request.flush(ratestMocked);

    expect(ratesToReturn).toEqual(ratestMocked);
  });
});
