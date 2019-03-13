import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTabsModule, MatBadgeModule} from '@angular/material';
import { EditUser } from './pages/edit-user/edit-user';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserTabs } from './pages/user-tabs/user-tabs';
import { FilterByRole } from './pipes/filter-by-role-pipe';
import { DragAndDrop } from './components/drag-and-drop/drag-and-drop';

@NgModule({
  declarations: [
    AppComponent, EditUser, UserTabs, FilterByRole, DragAndDrop
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    DragDropModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
