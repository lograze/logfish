import { Component, OnInit } from '@angular/core';
import { ClickhouseService } from '../_services/clickhouse.service';
import { ClickhouseResponse } from '../_models/ClickhouseResponse';
import { FilterOp } from '../_models/Filter';

@Component({
  selector: 'app-log-explorer',
  templateUrl: './log-explorer.component.html',
  styleUrls: ['./log-explorer.component.scss']
})
export class LogExplorerComponent implements OnInit {

  explorerData: ClickhouseResponse | null = null;

  constructor(private clickhouseService: ClickhouseService) { }

  ngOnInit(): void {
    this.clickhouseService.table$.subscribe(_ => this.refetchData());
    this.clickhouseService.filters$.subscribe(_ => this.refetchData());
  }

  refetchData(): void {
    this.clickhouseService.fetchData().subscribe(rs => {
      this.explorerData = rs;
    });
  }

  hasTimestampField(): boolean {
    return this.clickhouseService.hasTimestampField();
  }

  updateTimeRange(obj): void {
    const timeRange = obj._selecteds;
    this.clickhouseService.updateFilters('timestamp', timeRange, FilterOp.BETWEEN);
  }

}
