import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

import { Tender } from '../../../types/tender.type';
import { TenderService } from '../../../tender.service';
import { TenderTableDataSource } from './tender-table-data-source/tender-table-datasource.class';
import { TenderUnit } from '../../../types/tender-unit.type';


@Component({
  selector: 'st-my-table',
  templateUrl: './tender-table.component.html',
  styleUrls: ['./tender-table.component.scss']
})
export class TenderTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<Tender>;

  /** The zero-based page index of the displayed list of items. Defaulted to 0 */
  PAGE_INDEX: number = 0;

  /** Number of items to display on a page. Defaulted to 10 */
  PAGE_SIZE: number = 5;

  /** The set of provided page size options to display to the user */
  PAGE_SIZE_OPTION: number[] = [5, 10, 20, 25];

  /** Real number of rows in the table */
  get dataLength(): number {
    return this.dataSource.tenders ? this.dataSource.tenders.length : 0;
  }

  /** Data source for table */
  dataSource: TenderTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered */
  displayedColumns: string[] = [
    'index',
    'dateStart',
    'dateEnd',
    'title',
    'description',
    'expectedValue',
    'stepValue',
    'quantity'
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


  getLocalUnitCode(unit: TenderUnit): string {
    return this.tenderService.getLocalUnitCode(unit);
  }

}
