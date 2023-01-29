import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { TalentFormComponent } from './components/talent-form/talent-form.component';
import {ImageModule} from 'primeng/image';
import {ToolbarModule} from 'primeng/toolbar';
import { TalentListComponent } from './components/talent-list/talent-list.component';
import {CardModule} from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button'
import { ToastModule} from 'primeng/toast'
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TalentFormComponent,
    TalentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatDividerModule,
    MatCardModule,
    ImageModule,
    ToolbarModule,
    CardModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
