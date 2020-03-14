import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CarsComponent } from './cars/cars.component';
import { CarComponent } from './car/car.component';
import { NewCarComponent } from './new-car/new-car.component';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OptionComponent } from './option/option.component';
import { OptionHostDirective } from './option/option-host.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { fakeBackendProvider } from './dev-infrastructure/http-interceptor';
import { environment } from '../environments/environment';
import { CarEditComponent } from './car-edit/car-edit.component';

const appRoutes: Routes = [
  { path: 'cars', component: CarsComponent },
  { path: 'car/:id', component: CarComponent },
  { path: 'car-edit/:id', component: CarEditComponent },
  { path: 'new-car', component: NewCarComponent },
  { path: '', redirectTo: 'cars', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    NewCarComponent,
    CarComponent,
    OptionComponent,
    OptionHostDirective,
    CarEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: environment.production ? [] : [
    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    console.log('Prod environment: ' + environment.production);
  }
}
