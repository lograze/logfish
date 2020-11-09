import {Component, Input, OnInit} from '@angular/core';
import {FilterOp} from '../../_models/Filter';
import {ClickhouseService} from '../../_services/clickhouse.service';
import {Meta} from '../../_models/ClickhouseResponse';

@Component({
  // used to inject content into <tr> element of log explorer table
  // tslint:disable-next-line:component-selector
  selector: '[log-row]',
  templateUrl: './log-row.component.html',
  styleUrls: ['./log-row.component.scss']
})
export class LogRowComponent implements OnInit {

  @Input() meta: Meta[];
  @Input() row: Array<any>;

  isExpanded = false;

  constructor(private clickhouseService: ClickhouseService) { }

  ngOnInit(): void {
  }

  addFilter(k, v): void {
    this.clickhouseService.updateFilters(k, v, FilterOp.EQ);
  }

  toggleRow(): void {
    this.isExpanded = !this.isExpanded;
  }

}
