import {Component, OnInit} from '@angular/core';
import {ClickhouseService} from '../_services/clickhouse.service';
import {ClickhouseResponse} from '../_models/ClickhouseResponse';

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

}
