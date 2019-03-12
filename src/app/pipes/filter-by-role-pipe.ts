import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({name: 'filterbyrole'})
export class FilterByRole implements PipeTransform {
  transform(users: User[], role: string): User[] {
    let filteredUsers = users.filter((user: User)=>{
      return user.role == role;
    });
    return filteredUsers;
  }
}