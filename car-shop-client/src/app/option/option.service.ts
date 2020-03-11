import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Option } from '../option/Option';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  private getOptions = '/all-options';

  constructor(private http: HttpClient) { }

  getAllOptions(): Observable<Option[]> {
    return this.http.get<Option[]>(this.getOptions);
  }
}
