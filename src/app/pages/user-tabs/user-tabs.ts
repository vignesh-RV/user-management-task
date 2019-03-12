import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { UtilService } from '../../services/util-service';

@Component({
  selector: 'user-tabs',
  templateUrl: './user-tabs.html',
  styleUrls: ['./user-tabs.scss']
})
export class UserTabs {
  allRoles:any[] = [];
  users:any[] = [];
  constructor(private util: UtilService){
    this.users = this.util.getAllUsersList();
    this.allRoles = this.util.allRoles.filter((role)=> role != "normal"); //removing normal from tabs

    util.updateUsersListInUI.subscribe((updateUI: boolean)=>{
      if(updateUI){
        this.users = this.util.getAllUsersList();
      }
    });
  }
  
  drop(event: CdkDragDrop<string[]>, role?:string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Changing the role value
      let currentElement:any = event.previousContainer.data[event.previousIndex];
      if(currentElement && currentElement.id){
        currentElement.role = role;
        this.util.updateUser(currentElement);
      }
      // Checking for the max value
      if(event.container.data && event.container.data.length > 10){
        this.util.alert(1, "max_limit_message");
        return;
      }
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  deleteUser(userId: any) {
    this.util.deleteUser(userId).then((response)=>{
      if(response){
        this.util.alert(1, "delete_success_message");
      }else this.util.alert(2, "error_message");
    });
  }
}
