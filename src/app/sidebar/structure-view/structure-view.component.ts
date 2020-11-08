import { Component, OnInit } from '@angular/core';
import { ClickhouseService } from '../../_services/clickhouse.service';
import { Meta } from '../../_models/ClickhouseResponse';

@Component({
  selector: 'app-structure-view',
  templateUrl: './structure-view.component.html',
  styleUrls: ['./structure-view.component.scss']
})
export class StructureViewComponent implements OnInit {

  structure: Meta[];

  constructor(private clickhouseService: ClickhouseService) { }

  ngOnInit(): void {
    this.clickhouseService.tableStructure$.subscribe(meta => {
      this.structure = meta;
    });
  }

}
