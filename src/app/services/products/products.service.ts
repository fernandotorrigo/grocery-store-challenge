import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { envData, Product } from 'src/app/shared/models';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  baseApi = envData.BASE_API || `http://localhost:8000`;

  /**
   * Function fetch data from products api
   *
   * @returns Observable<Product[]>
   */
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseApi}/products`);
  }
}
