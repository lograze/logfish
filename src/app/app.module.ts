import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopnavComponent } from './topnav/topnav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LogExplorerComponent } from './log-explorer/log-explorer.component';
import { StructureViewComponent } from './sidebar/structure-view/structure-view.component';
import { FiltersBarComponent } from './log-explorer/filters-bar/filters-bar.component';
import { StatsBarComponent } from './log-explorer/stats-bar/stats-bar.component';
import { LogRowComponent } from './log-explorer/log-row/log-row.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FilterBadgeComponent } from './log-explorer/filters-bar/filter-badge/filter-badge.component';

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
