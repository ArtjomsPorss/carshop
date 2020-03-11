import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CarsComponent } from './cars/cars.component';
import { CarComponent } from './car/car.component';
import { NewCarComponent } from './new-car/new-car.component';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { OptionComponent } from './option/option.component';
import { OptionHostDirective } from './option/option-host.directive';

const appRoutes: Routes = [
  { path: 'cars', component: CarsComponent },
  { path: 'car/:id', component: CarComponent },
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
    OptionHostDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
