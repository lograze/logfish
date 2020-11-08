import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopnavComponent } from './topnav/topnav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LogExplorerComponent } from './log-explorer/log-explorer.component';
import { StructureViewComponent } from './sidebar/structure-view/structure-view.component';
import { FiltersBarComponent } from './log-explorer/filters-bar/filters-bar.component';
import { StatsBarComponent } from './log-explorer/stats-bar/stats-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    TopnavComponent,
    SidebarComponent,
    LogExplorerComponent,
    StructureViewComponent,
    FiltersBarComponent,
    StatsBarComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
