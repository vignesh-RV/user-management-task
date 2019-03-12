import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditUser } from './pages/edit-user/edit-user';
import { UserTabs } from './pages/user-tabs/user-tabs';

const routes: Routes = [
  { path: "edit-user", component: EditUser},
  { path: "user-list", component: UserTabs},
  { path: "", redirectTo: "user-list", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
