import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../core/services/login/login.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {RequestStatus} from '../../core/services/request-status';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  requestStatus = RequestStatus;
  loginStatus: RequestStatus = RequestStatus.WAITING;
  loginError?: string;

  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onLogin(loginForm: NgForm): void {
    if (loginForm.valid) {
      this.loginStatus = RequestStatus.LOADING;
      const data = loginForm.value;

      this.loginService.login(data.username, data.password).subscribe(value => {
          if (value) {
            this.loginStatus = RequestStatus.SUCCESS;
            this.router.navigate(['home'], {skipLocationChange: true});
          } else {
            this.loginError = 'Username or password is not correct';
            this.loginStatus = RequestStatus.ERROR;
          }
        },
        error => {
          this.loginError = error;
          this.loginStatus = RequestStatus.ERROR;
        });
    } else {
      this.loginError = 'Provide a username and password';
      this.loginStatus = RequestStatus.ERROR;
    }
  }
}
