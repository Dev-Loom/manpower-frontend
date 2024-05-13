import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SIDE_NAV_ITEMS } from 'src/app/constants';
import { UIService } from 'src/app/services/ui.service';
import { AddPersonComponent } from '../../person/add-person/add-person.component';
import { AddDetailsDialogComponent } from '../add-details-dialog/add-details-dialog.component';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'],
})
export class LeftMenuComponent implements OnInit {
  isExpanded: boolean = true;
  activeNav: number;
  isAuthenticated: boolean = false;
  isPersonExpand: boolean = false;
  isPromotionExpand: boolean = false;
  isCourseExpand: boolean = false;
  isCadreExpand: boolean = false;
  isLeaveExpand: boolean = false;
  isEreExpand: boolean = false;
  isAttExpand: boolean = false;
  isProfessionalExpand: boolean = false;
  isDiscpExpand: boolean = false;
  isMiscExpand: boolean = false;
  isWeaponExpand: boolean = false;
  SIDE_NAV_ITEMS = SIDE_NAV_ITEMS;

  constructor(
    private uiService: UIService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('activeNav'))
      this.activeNav = +localStorage.getItem('activeNav');
    else this.activeNav = 0;
    this.uiService.isAuthenticated.subscribe((res) => {
      this.isAuthenticated = res;
    });
  }

  toggleExpand() {
    setTimeout(() => {
      this.isExpanded = !this.isExpanded;
      if (!this.isExpanded) {
        this.isPersonExpand = false;
        this.isPromotionExpand = false;
        this.isCourseExpand = false;
        this.isCadreExpand = false;
        this.isLeaveExpand = false;
        this.isEreExpand = false;
        this.isAttExpand = false;
        this.isProfessionalExpand = false;
        this.isDiscpExpand = false;
        this.isMiscExpand = false;
      }
    }, 20);
  }

  setActiveNav(nav: number) {
    localStorage.setItem('activeNav', nav.toString());
    this.activeNav = nav;
  }
  onAddDetails(activeNav: any) {
    this.dialog.closeAll();
    const dialogComponentStyle = {
      width: '60vw',
      disableClose: true,
      height: 'fit-content',
      position: { top: '8rem', left: '41rem' },
      hasBackdrop: true,
    };
    console.log(activeNav);
    if (activeNav.name === SIDE_NAV_ITEMS.PERSON.name) {
      const dialogRef = this.dialog.open(AddPersonComponent, {
        ...dialogComponentStyle,
        data: { type: activeNav },
      });

      // document.body.classList.add('cdk-global-scrollblock');

      dialogRef.afterClosed().subscribe((res) => {
        // document.body.classList.remove('cdk-global-scrollblock');
      });
    } else {
      const dialogRef = this.dialog.open(AddDetailsDialogComponent, {
        ...dialogComponentStyle,
        hasBackdrop: true,
        data: { type: activeNav.name, role: activeNav.roleId },
      });

      dialogRef.afterClosed().subscribe((res) => {});
    }
  }

  onNavigate(route: string) {
    this.router.navigate([`${route}`]);
  }
  onNavItemSelect(activeNav: number) {
    this.setActiveNav(activeNav);
    if (this.isExpanded) {
      if (activeNav === SIDE_NAV_ITEMS.PERSON.navPosition) {
        this.isPersonExpand = !this.isPersonExpand;
      } else if (activeNav === SIDE_NAV_ITEMS.PROMOTION.navPosition) {
        this.isPromotionExpand = !this.isPromotionExpand;
      } else if (activeNav === SIDE_NAV_ITEMS.COURSES.navPosition) {
        this.isCourseExpand = !this.isCourseExpand;
      } else if (activeNav === SIDE_NAV_ITEMS.CADRES.navPosition) {
        this.isCadreExpand = !this.isCadreExpand;
      } else if (activeNav === SIDE_NAV_ITEMS.LEAVE.navPosition) {
        this.isLeaveExpand = !this.isLeaveExpand;
      } else if (activeNav === SIDE_NAV_ITEMS.ERE.navPosition) {
        this.isEreExpand = !this.isEreExpand;
      } else if (activeNav === SIDE_NAV_ITEMS.ATT.navPosition) {
        this.isAttExpand = !this.isAttExpand;
      } else if (activeNav === SIDE_NAV_ITEMS.PROFESSIONAL.navPosition) {
        this.isProfessionalExpand = !this.isProfessionalExpand;
      } else if (activeNav === SIDE_NAV_ITEMS.DISCP.navPosition) {
        this.isDiscpExpand = !this.isDiscpExpand;
      } else if (activeNav === SIDE_NAV_ITEMS.MISC.navPosition) {
        this.isMiscExpand = !this.isMiscExpand;
      } else if (activeNav === SIDE_NAV_ITEMS.WEAPON.navPosition) {
        this.isWeaponExpand = !this.isWeaponExpand;
      }
    }
  }
  toggleOnIconClick() {
    console.log(this.isExpanded);
    if (!this.isExpanded) {
      this.isExpanded = !this.isExpanded;
    }
  }
}
