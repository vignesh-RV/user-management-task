import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilService } from '../../services/util-service';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.html',
  styleUrls: ['./edit-user.scss']
})
export class EditUser {
  userForm:FormGroup;
  isNewUser:boolean = true;
  selectedUserData:any = {};
  allRoles:any[] = [];

  constructor(private util: UtilService){
    this.selectedUserData = this.util.selectedUserData;
    this.allRoles = this.util.allRoles;

    if(this.selectedUserData.id) this.isNewUser = false;

    this.userForm = new FormGroup({
      id: new FormControl( this.selectedUserData.id || 0),
      fullname: new FormControl( this.selectedUserData.fullname || '', [Validators.required]),
      address: new FormControl(this.selectedUserData.address || ''),
      email: new FormControl(this.selectedUserData.email || '', [Validators.required, Validators.email]),
      phone: new FormControl(this.selectedUserData.phone || ''),
      role: new FormControl(this.selectedUserData.role || 'normal', [Validators.required])
    });
  }
  
  ngOnInit(): any{
    
  }

  saveUserData(): any{
    let userData = this.userForm.getRawValue();
    if(this.isNewUser){
      this.util.addUser(userData).then((response)=>{
        if(response){
          this.util.alert(1, "add_success_message");
          this.util.redirectTo("user-list");
        }else this.util.alert(2, "duplicate_error_message");
      });
    }else{
      this.util.updateUser(userData).then((response)=>{
        if(response){
          this.util.alert(1, "update_success_message");
          this.util.redirectTo("user-list");
        }else this.util.alert(2, "error_message");
      });
    }
  }
}
