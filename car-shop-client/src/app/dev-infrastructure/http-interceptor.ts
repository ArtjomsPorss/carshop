import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Car } from '../car/Car';
import { Option } from '../option/Option';

// array in local storage for registered users
let cars: Car[] = [
    {id: 1, make:'Ford', model: 'Focus', edition:'2.0 CDTI Bi-Turbo ecoFLEX S/S', price:32000.00, selectedOptions: [{carId:1, price:90, selectedOption:1}, {carId:1, price:50, selectedOption:2}, {carId:1, price:100, selectedOption:3}]},
    {id: 2, make:'Opel', model:'Insignia', edition:'2.0 CDTI Bi-Turbo ecoFLEX S/S', price:30000.00, selectedOptions: []},
    {id: 3, make:'Volkswagen', model:'ID.3', edition:'Pro S', price:42000.00, selectedOptions: []},
    {id: 4, make:'Mercedes', model:'GLA SUV', edition:'2.0 CDTI Bi-Turbo ecoFLEX S/S', price:34500.00, selectedOptions: []},
    {id: 5, make:'Nissan', model:'GT-R', edition:'3.8L DOHC 24-valve Twin-Turbo', price:113540.00, selectedOptions: []},
    {id: 6, make:'Porsche', model:'Panamera', edition:'E-Performance', price:87200.00, selectedOptions: []},
    {id: 7, make:'BMW', model:'M8', edition:'Coupe', price:133000.00, selectedOptions: []}
]

// array of options for frontend
let options: Option[] = [
    {id:1, name:'Sunroof'},
    {id:2, name:'Heated Seats'},
    {id:3, name:'Air Conditioner'},
    {id:4, name:'Navigation'},
    {id:5, name:'Parking Camera System'},
    {id:6, name:'Turbo'},
    {id:7, name:'Winter Tyre Set'},
    {id:8, name:'Driver Assistant'},
    {id:9, name:'Splash Guards'},
    {id:10,name: 'Door Kick Plates'},
    {id:11,name: 'Rear Cargo Cover'},
    {id:12,name: 'Ash Cup'},
    {id:13,name: 'Safety Kit'},
    {id:14,name: 'Cargo Net'},    
]

/**
 * Http call interceptor to use in development
 */
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/allcars') && method === 'GET':
                    return getCars();
                case url.match('/car//[0-9]') && method === 'GET':
                    return getCarById();
                case url.match('/car-edit//[0-9]') && method === 'GET':
                    return getCarById();
                case url.match('/delete-car') && method === 'POST':
                    return deleteCar();
                case url.match('/updateCarDetails') && method === 'POST':
                    return updateCar();
                case url.match('/new-car') && method === 'POST':
                    return newCar();
                case url.endsWith('/all-options') && method === 'GET':
                    return getOptions();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        function getCars() {
            return ok(cars);
        }

        function getCarById() {
            // var car = carFromBody();
            const carfound = cars.find(x => x.id == idFromUrl());
            return ok(carfound);
        }

        function deleteCar() {
            var car = carFromBody();
            cars = cars.filter(x => x.id !== car.id);
            return ok('');
        }
        
        function updateCar() {
            var car = carFromBody();
            cars = cars.filter(x => x.id !== car.id);
            cars.push(car);
            return ok();
        }

        function newCar() {
            var car = carFromBody()
            var max = Math.max.apply(Math, cars.map(e => e.id));
            car.id = max === undefined ? 1 : max+1;
            car.selectedOptions.forEach(e => e.carId = max);
            cars.push(car);
            return ok(car);
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function carFromBody(): Car {
            const car: Car = body;
            return car
        }

        function getOptions() {
            return ok(options);
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};