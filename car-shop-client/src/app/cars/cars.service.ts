import { Injectable } from '@angular/core';
import { Car } from '../car/Car';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private getCarUrl = '/car/';
  private getCarsUrl = '/allcars';
  private postUpdateCarDetails = '/updateCarDetails';
  private saveCarUrl = '/new-car';
  
  constructor(private http: HttpClient) { }
  
  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.getCarsUrl);
  }
  
  getCar(id: number): Observable<Car> {
    const url = `${this.getCarUrl}/${id}`;
    return this.http.get<Car>(url);
  }

  updateCarDetails(car: Car): Observable<Car> {
    console.log(car);
    return this.http.post<Car>(this.postUpdateCarDetails, car);
  }

  saveCar(car: Car): Observable<Car> {
    console.log(car);
    return this.http.post<Car>(this.saveCarUrl, car);
  }
}
