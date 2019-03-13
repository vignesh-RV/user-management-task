import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { constants } from '../constants/const';

@Injectable({
    providedIn: "root"
})
export class UtilService {
    public selectedUserData:any = {};
    public allRoles:any[] = ["admin", "moderate", "normal"];

    public updateUsersListInUI:any = new Subject();
    public updatedSelectedUserData:any = new Subject();

    constructor(private router: Router, private toastr: ToastrService) {
    }

    addUser(newuser: User): any{
        return new Promise((resolve, reject) => {
            var users = this.getAllUsersList();
            if (users && users.length) {
                var isDuplicateUser = users.some((user: User) => {
                    return user.email == newuser.email;
                });

                if (isDuplicateUser) {
                    resolve( false );
                    return;
                }
            } else users = [];
            newuser.id = new Date().getTime();//generating unique user id
            users.push(newuser);
            this.updateUsersList(users);
            resolve( true );
        })
    }

    updateUser(user: User): any{
        return new Promise((resolve, reject) => {
            var users = this.getAllUsersList();
            if (users && users.length) {
                var userIndex = users.findIndex((userdata: User) => {
                    return user.email == userdata.email;
                });

                if (userIndex == -1) {
                    resolve( false );
                    return;
                }else{
                    users[userIndex] = user;
                    this.updateUsersList(users);
                    resolve( true );
                }
            }    
        })
    }

    deleteUser(userId: number): any{
        return new Promise((resolve, reject) => {
            var users = this.getAllUsersList();
            if (users && users.length) {
                var userIndex = users.findIndex((user: User) => {
                    return user.id == userId
                });

                if (userIndex == -1) {
                    resolve( false );
                    return;
                }else{
                    users.splice(userIndex, 1);
                    this.updateUsersList(users);
                    resolve( true );
                }
            }    
        })
    }

    getUserData(userId?: any): User{
        let userData: User;
        if (!userId) {
            userData = this.decodeData( localStorage.getItem("currentUser") );
        } else {
            var users = this.decodeData( localStorage.getItem("usersList") );
            if (users && users.length) {
                var userdata = users.filter((user: User) => {
                    return user.id == userId;
                });

                if (userdata && userdata.length) {
                    userData = userdata[0];
                }
            }
        }

        return userData;
    }

    getAllUsersList(): any{
        return this.decodeData( localStorage.getItem("usersList") ) || [];
    }

    updateUsersList(users:any): any{
        localStorage.setItem("usersList", this.encodeData(users));
    }

    encodeData(data:any): any{
        return data ? btoa( JSON.stringify( data ) ) : "";
    }

    decodeData(data:any): any{
        return data ? JSON.parse( atob(data) ) : "";
    }

    alert(type: number, message: string): any{
        message = constants[message] || message; //trying to take from constant messages
        
        // 1 : success, 2: error, 3: warning
        switch (type) {
            case 1: { //success
                this.toastr.success(message);
                break;
            }
            case 2: { //error
                this.toastr.error(message);
                break;
            }
            case 3: { //warning
                this.toastr.warning(message);
                break;
            }
        }
    }

    redirectTo(path?: string): any{
        this.router.navigate(["/"+path]);
    }
}