import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MainDaemonService} from './core/services/main-daemon.service';
import {SidenavService} from './core/services/sidenav/sidenav.service';
import {MatSidenav} from '@angular/material/sidenav';
import {LoginService} from './core/services/login/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'rBitTorrent';

  @ViewChild('sidenav') public sidenav?: MatSidenav;

  constructor(
    translate: TranslateService, private sidenavService: SidenavService,
    private loginService: LoginService,
    private router: Router
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngAfterViewInit(): void {
    if (this.sidenav instanceof MatSidenav) {
      this.sidenavService.setSidenav(this.sidenav);
    }
  }

  logout(): void {
    this.loginService.logout().subscribe();
  }

  navigate(route: string): void {
    this.router.navigate([route], {skipLocationChange: true});
  }
}
