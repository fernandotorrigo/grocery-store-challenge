import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rates } from 'src/app/models';
@Injectable({
  providedIn: 'root',
})
export class RatesService {
  constructor(private http: HttpClient) {}

  getCurrencyData(): Observable<Rates> {
    return this.http.get<Rates>('http://localhost:8000/rates');
  }
}
