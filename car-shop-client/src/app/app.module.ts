import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CarsComponent } from './cars/cars.component';

import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './car/car.component';
import { NewCarComponent } from './new-car/new-car.component';

const appRoutes: Routes = [
  { path: 'cars', component: CarsComponent },
  { path: 'car/:id', component: CarComponent },
  { path: 'new-car', component: NewCarComponent },
  { path: '', redirectTo: 'cars', pathMatch: 'full'}

]

@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    NewCarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
