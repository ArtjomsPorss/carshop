import { Injectable } from '@angular/core';
import { Car } from '../car/Car';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  constructor(private http: HttpClient) { }

  getCarsUrl = '/allcars';


  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.getCarsUrl);
  }
}
