import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

import { Tender } from '../../../types/tender.type';
import { TenderService } from '../../../tender.service';
import { TenderTableDataSource } from './tender-table-data-source/tender-table-datasource.class';


@Component({
  selector: 'st-my-table',
  templateUrl: './tender-table.component.html',
  styleUrls: ['./tender-table.component.scss']
})
export class TenderTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<Tender>;

  dataSource: TenderTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = [
    'index',
    'dateStart',
    'dateEnd',
    'title',
    'description',
    'expectedValue',
    'stepValue',
    'id'
  ];


  constructor(protected translateService: TranslateService,
              protected tenderService: TenderService) {
  }


  ngOnInit(): void {
    this.dataSource = new TenderTableDataSource(this.translateService, this.tenderService);
  }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

}
