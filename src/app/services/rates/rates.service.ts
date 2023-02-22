import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envData, Rates } from 'src/app/shared/models';
@Injectable({
  providedIn: 'root',
})
export class RatesService {
  constructor(private http: HttpClient) {}

  baseApi = envData.BASE_API || `http://localhost:8000`;

  /**
   * Function fetch data from rates api
   *
   * @returns Observable<Product[]>
   */
  getCurrencyData(): Observable<Rates> {
    return this.http.get<Rates>(`${this.baseApi}/rates`);
  }
}
