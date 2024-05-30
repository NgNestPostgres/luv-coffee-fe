import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { SidenavTreeComponent } from './components/sidenav-tree/sidenav-tree.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { ThemeManagerComponent } from './components/theme-manager/theme-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    TopMenuComponent,
    SidenavTreeComponent,
    SearchBoxComponent,
    ThemeManagerComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AuthModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
