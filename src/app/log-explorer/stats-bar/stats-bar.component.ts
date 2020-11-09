import { Component, OnInit } from '@angular/core';
import {ClickhouseService} from '../../_services/clickhouse.service';
import {LastQueryStats} from '../../_models/LastQueryStats';

@Component({
  selector: 'app-stats-bar',
  templateUrl: './stats-bar.component.html',
  styleUrls: ['./stats-bar.component.scss']
})
export class StatsBarComponent implements OnInit {

  stats: LastQueryStats;

  constructor(private clickhouseService: ClickhouseService) { }

  ngOnInit(): void {
    this.clickhouseService.lastQueryStats$.subscribe(stats => this.stats = stats);
  }

  hits(): string {
    let res = this.stats.rows.toString();
    if (this.stats.limit_cut) {
      res += '+';
    }

    return res;
  }

}
