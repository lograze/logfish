import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadSpinnerService {

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  setLoading(isLoading: boolean): void {
    this.isLoading.next(isLoading);
  }

}
