import { Component, OnInit } from '@angular/core';
import {ClickhouseService} from '../_services/clickhouse.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  databases: string[] = [];
  tables: string[] = [];

  selectedDatabase = '';
  selectedTable = '';

  constructor(private clickhouseService: ClickhouseService) { }

  ngOnInit(): void {
    this.clickhouseService.fetchDatabases().subscribe(rs => {
        this.databases = rs;
        this.selectedDatabase = this.databases[0];
        this.onDatabaseChange();
    });
  }

  onDatabaseChange(): void {
    this.clickhouseService.updateDatabase(this.selectedDatabase);
    this.clickhouseService.fetchTables().subscribe(rs => {
      this.tables = rs;
      this.selectedTable = this.tables[0];
      this.onTableChange();
    });
  }

  onTableChange(): void {
    this.clickhouseService.updateTable(this.selectedTable);
  }

}
