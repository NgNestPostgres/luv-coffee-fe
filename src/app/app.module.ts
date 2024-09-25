import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home/home/home.component';
import { NotFoundComponent } from './home/not-found/not-found.component';
import { SearchBoxComponent } from './home/search-box/search-box.component';
import { SidenavTreeComponent } from './home/sidenav-tree/sidenav-tree.component';
import { ThemeManagerComponent } from './home/theme-manager/theme-manager.component';
import { TopMenuComponent } from './home/top-menu/top-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    TopMenuComponent,
    SidenavTreeComponent,
    SearchBoxComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AuthModule,
    AppRoutingModule,
    ThemeManagerComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
