import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DailogType, RankOrder } from 'src/app/constants';
import { UIService } from 'src/app/services/ui.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import { SoldierService } from 'src/app/services/soldier/soldier.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userName: string;
  armyNo: string;
  search = new Subject<string>();
  searchResults: any[] = [];
  constructor(
    public dialog: MatDialog,
    private uiService: UIService,
    private router: Router,
    private soldierService: SoldierService
  ) {
    this.uiService.userName.subscribe((res) => {
      this.userName = res;
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.search
      .pipe(
        map((searchString: string) => searchString),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((data) =>
          this.soldierService.getAllPerson({
            pageNo: 0,
            pageLimit: 10,
            search: data,
          })
        )
      )
      .subscribe((res: any) => {
        if (res.data) {
          const getRank = new Map(
            Array.from(RankOrder, (a) => a.reverse()) as []
          );
          this.searchResults = res.data.persons;
          this.searchResults.forEach((result) => {
            result.rank = getRank.get(result.rank);
            result.photo = `http://localhost:3000/${result.photo}`;
          });
        } else {
          this.searchResults = [];
        }
      });

    this.search.subscribe((res: any) => {
      if (res.data) {
        //
      }
    });
  }

  onLogout() {
    this.dialog.open(DialogComponent, {
      width: '40rem',
      data: {
        type: DailogType.LOGOUT,
        header: 'Logout',
        message: 'Are you sure want to logout?',
      },
      position: { top: '8rem' },
    });
  }

  onPersonSelection() {
    this.searchResults = [];
    this.armyNo = undefined;
  }
}
