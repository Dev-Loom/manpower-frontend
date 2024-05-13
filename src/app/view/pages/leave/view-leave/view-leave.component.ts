import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  COYName,
  DailogType,
  Filters,
  LeaveFilters,
  RankOrder,
} from 'src/app/constants';
import { SoldierService } from 'src/app/services/soldier/soldier.service';
import { UIService } from 'src/app/services/ui.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { FieldType } from 'src/app/constants';

@Component({
  selector: 'app-leave',
  templateUrl: './view-leave.component.html',
  styleUrls: ['./view-leave.component.css'],
})
export class ViewLeaveComponent implements OnInit {
  displayedColumns: string[] = [
    'sNo',
    'armyNo',
    'rank',
    'name',
    'coy',
    'type',
    'days',
    'from',
    'to',
  ];
  dataSource1 = new MatTableDataSource<any>();
  displayNoData: boolean = false;
  searchKey: string;
  personLists: any[];
  sortedData: any;
  COYName = COYName;
  activeCoy: string = COYName.ALL;
  isLoading: boolean = true;
  clickoutHandler: Function;
  dialogRef: MatDialogRef<any>;
  isDialogOpen: boolean = false;
  filteredSelected: number = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private uiService: UIService,
    private soldierService: SoldierService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllLeaves();
  }

  ngOnDestroy(): void {
    // this.dialogRef.close()
  }

  ngAfterViewInit(): void {
    this.dataSource1.paginator = this.paginator;
    this.dataSource1.sort = this.sort;
  }

  sortColumn(sort: Sort) {
    const data = this.personLists.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
    }
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  getAllLeaves() {
    const getAllPersonObj = {
      pageNo: 0,
      pageLimit: 100,
      search: this.searchKey,
    };
    this.soldierService.getAllLeaves(getAllPersonObj).subscribe(
      (res: any) => {
        const getRank = new Map(
          Array.from(RankOrder, (a) => a.reverse()) as []
        );
        res.data.leaves.forEach((person: any) => {
          person.Per.rank = getRank.get(person.Per.rank);
        });
        this.dataSource1.data = res.data.leaves;
        this.personLists = res.data.leaves;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }
  doFilter() {
    this.dataSource1.filter = this.searchKey.trim().toLowerCase();
    if (this.dataSource1.filteredData.length == 0) {
      this.displayNoData = true;
    } else {
      this.displayNoData = false;
    }
  }

  onClearSearch() {
    this.searchKey = '';
    this.doFilter();
  }

  onPageChange() {
    console.log('hello');
  }

  openFilterDialog() {
    if (!this.isDialogOpen) {
      this.dialogRef = this.dialog.open(DialogComponent, {
        width: '40rem',
        data: {
          type: DailogType.LEAVE_FILTER,
          filters: LeaveFilters,
          fieldType: FieldType,
        },
        backdropClass: 'cdk-overlay-transparent-backdrop',
        hasBackdrop: true,
        position: { top: '16.5rem', right: '1.8rem' },
      });
      this.isDialogOpen = true;
      this.dialogRef.afterClosed().subscribe((res) => {
        this.isDialogOpen = false;
        if (res && res.filteredLeaves) {
          const getRank = new Map(
            Array.from(RankOrder, (a) => a.reverse()) as []
          );
          res.filteredLeaves.data.leaves.forEach((leave: any) => {
            leave.Per.rank = getRank.get(leave.Per.rank);
          });
          this.filteredSelected = res.filteredSelected;
          this.dataSource1.data = res.filteredLeaves.data.leaves;
        }
      });
    }
  }
}
