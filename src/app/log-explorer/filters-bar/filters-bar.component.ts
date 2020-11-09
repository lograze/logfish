import { Component, OnInit } from '@angular/core';
import { ClickhouseService } from '../../_services/clickhouse.service';
import { Filter } from '../../_models/Filter';

@Component({
  selector: 'app-filters-bar',
  templateUrl: './filters-bar.component.html',
  styleUrls: ['./filters-bar.component.scss']
})
export class FiltersBarComponent implements OnInit {

  filters: Map<string, Filter> = new Map<string, Filter>();

  constructor(private clickhouseService: ClickhouseService) { }

  ngOnInit(): void {
    this.clickhouseService.filters$.subscribe(fs =>
      this.filters = fs);
  }

}
