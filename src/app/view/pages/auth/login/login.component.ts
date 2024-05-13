import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showpassword: boolean = false;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private uiService: UIService
  ) {
    if (localStorage.getItem('token')) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onShowPassword() {
    this.showpassword = !this.showpassword;
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe(
        (res) => {
          localStorage.setItem('token', res.data.token);
          this.router.navigate(['dashboard']);
          this.uiService.userName.next(res.data.name);
          this.uiService.showSnackBar('Successfully Logged In', null, 3000);
          this.isLoading = false;
        },
        (err) => {
          console.log(err);
          this.isLoading = false;
          if(err && err.error && err.error.message){
            this.uiService.showSnackBar(err.error.message, null, 3000);
          }else{
            this.uiService.showSnackBar('Unknown Error', null, 3000);
          }
        }
      );
    } else {
    }
  }
}
