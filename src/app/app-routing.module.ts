import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {AuthGuard} from './core/guards/auth/auth.guard';
import {AddTorrentComponent} from './pages/add-torrent/add-torrent.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'add', component: AddTorrentComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
