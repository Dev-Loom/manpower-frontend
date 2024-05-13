import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { UIService } from '../services/ui.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private uiService: UIService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const token: string | null = localStorage.getItem("token") || null ;

      if (token ) {
        return new Promise((resolve, reject) => {
          this.authService
            .getAdminDetails()
            .subscribe(
              (res:any) => {
                this.uiService.isAuthenticated.next(true);
                this.uiService.userName.next(res.data.name);
                return resolve(true);
              },
              (err:any) => {
                localStorage.removeItem("token");
                this.router.navigate(["login"]);
                return resolve(false);
              }
            );
        });
      } else {
        this.router.navigate(['login']);
        return false;
      }
  }

}
