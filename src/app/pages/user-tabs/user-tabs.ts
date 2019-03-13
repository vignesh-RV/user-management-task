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
  
  getUpdatedUsersList(): any{
    return this.util.getAllUsersList();
  }
}
