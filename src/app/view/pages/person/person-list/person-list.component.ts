import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  COYName,
  DailogType,
  FieldType,
  Filters,
  RankOrder,
} from 'src/app/constants';
import { SoldierService } from 'src/app/services/soldier/soldier.service';
import { UIService } from 'src/app/services/ui.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
})
export class PersonListComponent implements OnInit {
  displayedColumns1: string[] = ['armyNo', 'rank', 'name', 'coy', 'pl'];
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

    // this.dataSource1.sortingDataAccessor = (item, property) => {
    //   switch (property) {
    //     case 'armyNo': {
    //       return new Date(item.armyNo);
    //     }
    //     case 'rank': {
    //       return new Date(item.rank);
    //     }
    //     case 'name': {
    //       return new Date(item.name);
    //     }
    //     case 'coy': {
    //       return new Date(item.coy);
    //     }
    //     case 'pl': {
    //       return new Date(item.pl);
    //     }
    //     default: {
    //       return item[property];
    //     }
    //   }
    // };

    // this.sortedData = data.sort((a: any, b: any) => {
    //   console.log(a,'--',b)
    //   const isAsc = sort.direction === 'asc';
    //   switch (sort.active) {
    //     case 'armyNo':
    //       return this.compare(a.armyNo, b.armyNo, isAsc);
    //     case 'rank':
    //       return this.compare(a.rank, b.rank, isAsc);
    //     case 'name':
    //       return this.compare(a.name, b.name, isAsc);
    //     case 'coy':
    //       return this.compare(a.coy, b.coy, isAsc);
    //     case 'pl':
    //       return this.compare(a.pl, b.pl, isAsc);
    //     default:
    //       return 0;
    //   }
    // });
    // this.dataSource1.data = this.sortedData;
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
    this.soldierService.getAllPerson(getAllPersonObj).subscribe(
      (res: any) => {
        const getRank = new Map(
          Array.from(RankOrder, (a) => a.reverse()) as []
        );
        res.data.persons.forEach((person: any) => {
          person.rank = getRank.get(person.rank);
        });
        this.dataSource1.data = res.data.persons;
        this.personLists = res.data.persons;
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
      this.dialogRef = this.dialog.open(DialogComponent, {
        width: '40rem',
        data: {
          type: DailogType.PERSON_FILTER,
          filters: Filters,
          fieldType: FieldType,
        },
        backdropClass: 'cdk-overlay-transparent-backdrop',
        hasBackdrop: true,
        position: { top: '16.5rem', right: '1.8rem' },
      });

      this.isDialogOpen = true;

      this.dialogRef.afterClosed().subscribe((res) => {
        this.isDialogOpen = false;
        if (res && res.filteredPerson) {
          const getRank = new Map(
            Array.from(RankOrder, (a) => a.reverse()) as []
          );
          res.filteredPerson.data.persons.forEach((person: any) => {
            person.rank = getRank.get(person.rank);
          });
          this.filteredSelected = res.filteredSelected;
          this.dataSource1.data = res.filteredPerson.data.persons;
        }
      });
    }
  }
}
