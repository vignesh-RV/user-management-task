import { Component, Input, ChangeDetectorRef } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { UtilService } from '../../services/util-service';
import { User } from '../../models/user';

@Component({
  selector: 'drag-and-drop',
  templateUrl: './drag-and-drop.html',
  styleUrls: ['./drag-and-drop.scss']
})
export class DragAndDrop {
  @Input() users:any[] = [];
  @Input() role:string = "";

  constructor(private util: UtilService, private cdr: ChangeDetectorRef){
  }
  
  drop(event: CdkDragDrop<string[]>, role?:string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      
      // Checking for the max value
      if(event.container.data && event.container.data.length > 9){
        this.util.alert(2, "max_limit_message");
        return;
      }

      // Changing the role value
      let currentElement:any = event.previousContainer.data[event.previousIndex];
      if(currentElement && currentElement.id){
        currentElement.role = role;
        this.util.updateUser(currentElement);
      

      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

      }
    }
  }

  deleteUser(userId: any) {
    this.util.deleteUser(userId).then((response)=>{
      if(response){
        this.util.alert(1, "delete_success_message");
        this.util.updateUsersListInUI.next(true);
      }else this.util.alert(2, "error_message");
    });
  }

  EditUser(user:User): any{
    this.util.selectedUserData = user;
    this.util.updatedSelectedUserData.next(true);
    this.util.redirectTo("edit-user");
  }
}
