import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { UtilService } from './services/util-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'user-management';
  users:any[] =[];

  constructor(private util: UtilService){
    util.updateUsersListInUI.subscribe((updateUI: boolean)=>{
      if(updateUI){
        this.users = this.getAllUsersList();
      }
    });
  }

  ngOnInit(): any{
    this.users = this.getAllUsersList();
  }

  getAllUsersList(): any{
    return this.util.getAllUsersList();
  }

  deleteUser(userId: any) {
    this.util.deleteUser(userId).then((response)=>{
      if(response){
        this.util.alert(1, "delete_success_message");
      }else this.util.alert(2, "error_message");
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Changing the role value
      let currentElement:any = event.previousContainer.data[event.previousIndex];
      if(currentElement && currentElement.id){
        currentElement.role = "normal";
        this.util.updateUser(currentElement);
      }
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  addNewuser(): any{
    this.util.selectedUserData = {};
    this.util.redirectTo("edit-user");
  }
}
