import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopnavComponent } from './topnav/topnav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LogExplorerComponent } from './log-explorer/log-explorer.component';
import { StructureViewComponent } from './sidebar/structure-view/structure-view.component';
import { FiltersBarComponent } from './log-explorer/filters-bar/filters-bar.component';
import { StatsBarComponent } from './log-explorer/stats-bar/stats-bar.component';
import { LogRowComponent } from './log-explorer/log-row/log-row.component';
import { FilterBadgeComponent } from './log-explorer/filters-bar/filter-badge/filter-badge.component';
import { LoadSpinnerComponent } from './topnav/load-spinner/load-spinner.component';
import { LoadSpinnerInterceptor } from './_interceptors/load-spinner.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TopnavComponent,
    SidebarComponent,
    LogExplorerComponent,
    StructureViewComponent,
    FiltersBarComponent,
    StatsBarComponent,
    LogRowComponent,
    FilterBadgeComponent,
    LoadSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: LoadSpinnerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
