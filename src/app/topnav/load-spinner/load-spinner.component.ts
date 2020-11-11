import { Component, OnInit } from '@angular/core';
import { LoadSpinnerService } from '../../_services/load-spinner.service';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-load-spinner',
  templateUrl: './load-spinner.component.html',
  styleUrls: ['./load-spinner.component.scss']
})
export class LoadSpinnerComponent implements OnInit {

  isLoading: boolean;

  constructor(private loadSpinnerService: LoadSpinnerService) { }

  ngOnInit(): void {
    this.loadSpinnerService.isLoading
      .pipe(delay(0))
      .subscribe(state => this.isLoading = state);
  }

}
