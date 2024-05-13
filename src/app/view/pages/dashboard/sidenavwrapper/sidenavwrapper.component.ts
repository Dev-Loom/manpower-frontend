import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { onMainContentChange } from 'src/app/animations/side-nav.animation';
import { SIDE_NAV_ITEMS } from 'src/app/constants';
import { UIService } from 'src/app/services/ui.service';
import { AddPersonComponent } from '../../person/add-person/add-person.component';
import { AddDetailsDialogComponent } from '../add-details-dialog/add-details-dialog.component';

@Component({
  selector: 'app-sidenavwrapper',
  templateUrl: './sidenavwrapper.component.html',
  styleUrls: ['./sidenavwrapper.component.css'],
})
export class SidenavwrapperComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private uiService: UIService) {}

  ngOnInit(): void {
    this.uiService.isAuthenticated.subscribe((res) => {
      this.isAuthenticated = res;
    });
  }
}
