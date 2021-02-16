import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HomeComponent} from './pages/home/home.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {LoginComponent} from './pages/login/login.component';
import {BytesPipe} from './core/pipes/bytes/bytes.pipe';
import {TimePipe} from './core/pipes/time/time.pipe';
import {UepochPipe} from './core/pipes/uepoch/uepoch.pipe';
import {CredentialsInterceptor} from './core/interceptors/credentials/credentials.interceptor';
import {Router} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {TorrentListComponent} from './core/ui/components/torrent-list/torrent-list.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {DeleteDialogComponent} from './core/ui/dialogs/delete-dialog/delete-dialog.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatListModule} from '@angular/material/list';
import {HomeToolbarComponent} from './core/ui/components/home-toolbar/home-toolbar.component';
import {HomeStatusbarComponent} from './core/ui/components/home-statusbar/home-statusbar.component';
import {GlobalLimitsDialogComponent} from './core/ui/dialogs/global-limits-dialog/global-limits-dialog.component';
import {MatSliderModule} from '@angular/material/slider';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {MatTabsModule} from '@angular/material/tabs';
import {AddUrlTorrentsDialogComponent} from './core/ui/dialogs/add-url-torrents-dialog/add-url-torrents-dialog.component';
import {AddSpeedDialComponent} from './core/ui/components/add-speed-dial/add-speed-dial.component';
import {AddFileTorrentsDialogComponent} from './core/ui/dialogs/add-file-torrents-dialog/add-file-torrents-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { SettingsToolbarComponent } from './core/ui/components/settings-toolbar/settings-toolbar.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import { TorrentDetailsComponent } from './core/ui/components/torrent-details/torrent-details.component';
import { GeneralDetailsComponent } from './core/ui/components/torrent-details/general-details/general-details.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    LoginComponent,
    BytesPipe,
    TimePipe,
    UepochPipe,
    TorrentListComponent,
    DeleteDialogComponent,
    HomeToolbarComponent,
    HomeStatusbarComponent,
    GlobalLimitsDialogComponent,
    AddUrlTorrentsDialogComponent,
    AddFileTorrentsDialogComponent,
    AddSpeedDialComponent,
    SettingsToolbarComponent,
    TorrentDetailsComponent,
    GeneralDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FontAwesomeModule,
    FormsModule,
    DragDropModule,
    NgScrollbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatListModule,
    MatSliderModule,
    MatTabsModule,
    MatSelectModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatMenuModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CredentialsInterceptor,
      multi: true,
      deps: [Router],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
