import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home/home.component';
import { NotFoundComponent } from './home/not-found/not-found.component';
import { SearchBoxComponent } from './home/search-box/search-box.component';
import { SidenavTreeComponent } from './home/sidenav-tree/sidenav-tree.component';
import { ThemeManagerComponent } from './home/theme-manager/theme-manager.component';
import { TopMenuComponent } from './home/top-menu/top-menu.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    HomeComponent,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    NotFoundComponent,
    SearchBoxComponent,
    SidenavTreeComponent,
    ThemeManagerComponent,
    TopMenuComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
