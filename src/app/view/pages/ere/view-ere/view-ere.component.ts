import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  COYName,
  DailogType,
  EREFilters,
  Filters,
  RankOrder,
} from 'src/app/constants';
import { SoldierService } from 'src/app/services/soldier/soldier.service';
import { UIService } from 'src/app/services/ui.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { FieldType } from 'src/app/constants';

@Component({
  selector: 'app-ere',
  templateUrl: './view-ere.component.html',
  styleUrls: ['./view-ere.component.css'],
})
export class ViewEreComponent implements OnInit {
  displayedColumns: string[] = [
    'sNo',
    'armyNo',
    'rank',
    'name',
    'coy',
    'ere',
    'location',
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
    this.getAllPerson();
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
  getAllPerson() {
    const getAllPersonObj = {
      pageNo: 0,
      pageLimit: 100,
      search: this.searchKey,
    };
    this.soldierService.getAllERE(getAllPersonObj).subscribe(
      (res: any) => {
        const getRank = new Map(
          Array.from(RankOrder, (a) => a.reverse()) as []
        );
        res.data.eres.forEach((person: any) => {
          person.Per.rank = getRank.get(person.Per.rank);
        });
        this.dataSource1.data = res.data.eres;
        this.personLists = res.data.eres;
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
  // setActiveCoy(activeCoy: string) {
  //   this.activeCoy = activeCoy;
  //   const filteredPersonByCoy = this.personLists.filter((person) => {
  //     if(person.coy === activeCoy) {
  //       return person
  //     } else if(activeCoy === COYName.ALL) {
  //       return person
  //     }
  //   });

  //   this.dataSource1.data = filteredPersonByCoy;
  // }
  openFilterDialog() {
    if (!this.isDialogOpen) {
      this.getEreName();
      this.dialogRef = this.dialog.open(DialogComponent, {
        width: '40rem',
        data: {
          type: DailogType.ERE_FILTER,
          filters: EREFilters,
          fieldType: FieldType,
        },
        backdropClass: 'cdk-overlay-transparent-backdrop',
        hasBackdrop: true,
        position: { top: '26.5rem', right: '1.8rem' },
      });
      this.isDialogOpen = true;
      this.dialogRef.afterOpened().subscribe(() => {});
      this.dialogRef.afterClosed().subscribe((res) => {
        this.isDialogOpen = false;
        if (res && res.filteredEres) {
          const getRank = new Map(
            Array.from(RankOrder, (a) => a.reverse()) as []
          );
          res.filteredEres.data.eres.forEach((ere: any) => {
            ere.Per.rank = getRank.get(ere.Per.rank);
          });
          this.filteredSelected = res.filteredSelected;
          this.dataSource1.data = res.filteredEres.data.eres;
        }
      });
    }
  }

  getEreName() {
    // const EreName
    this.soldierService.getEREList().subscribe((res: any) => {
      const ereName = res.data.map((ere: any) => ere.name);
      EREFilters.find((e) => e.filterName === 'name').options = ereName;
    });
  }
}
