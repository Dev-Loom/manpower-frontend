import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  CourseFilters,
  COYName,
  DailogType,
  Filters,
  RankOrder,
} from 'src/app/constants';
import { SoldierService } from 'src/app/services/soldier/soldier.service';
import { UIService } from 'src/app/services/ui.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { FieldType } from 'src/app/constants';

@Component({
  selector: 'app-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css'],
})
export class ViewCourseComponent implements OnInit {
  displayedColumns: string[] = [
    'sNo',
    'armyNo',
    'rank',
    'name',
    'coy',
    'course',
    'location',
    'from',
    'to',
    'grading',
  ];
  dataSource1 = new MatTableDataSource<any>();
  displayNoData: boolean = false;
  searchKey: string;
  courseLists: any[];
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
    this.getAllCourse();
  }

  ngOnDestroy(): void {
    // this.dialogRef.close()
  }

  ngAfterViewInit(): void {
    this.dataSource1.paginator = this.paginator;
    this.dataSource1.sort = this.sort;
  }

  sortColumn(sort: Sort) {
    const data = this.courseLists.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
    }
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  getAllCourse() {
    const getAllPersonObj = {
      pageNo: 0,
      pageLimit: 100,
      search: this.searchKey,
    };
    this.soldierService.getAllCourses(getAllPersonObj).subscribe(
      (res: any) => {
        const getRank = new Map(
          Array.from(RankOrder, (a) => a.reverse()) as []
        );
        res.data.courses.forEach((person: any) => {
          person.Per.rank = getRank.get(person.Per.rank);
        });
        this.dataSource1.data = res.data.courses;
        this.courseLists = res.data.courses;
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
      this.getCourseName();
      this.dialogRef = this.dialog.open(DialogComponent, {
        width: '40rem',
        data: {
          type: DailogType.COURSE_FILTER,
          filters: CourseFilters,
          fieldType: FieldType,
        },
        backdropClass: 'cdk-overlay-transparent-backdrop',
        hasBackdrop: true,
        position: { top: '16.5rem', right: '1.8rem' },
      });
      this.isDialogOpen = true;
      this.dialogRef.afterOpened().subscribe(() => {});
      this.dialogRef.afterClosed().subscribe((res) => {
        this.isDialogOpen = false;
        if (res && res.filteredCourses) {
          const getRank = new Map(
            Array.from(RankOrder, (a) => a.reverse()) as []
          );
          res.filteredCourses.data.courses.forEach((course: any) => {
            course.Per.rank = getRank.get(course.Per.rank);
          });
          this.filteredSelected = res.filteredSelected;
          this.dataSource1.data = res.filteredCourses.data.courses;
        }
      });
    }
  }
  getCourseName() {
    this.soldierService.getCourseList().subscribe((res: any) => {
      const courseName = res.data.map((course: any) => course.name);
      CourseFilters.find((f) => f.filterName === 'course').options = courseName;
    });
  }
}
