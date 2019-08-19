import { Injectable } from '@angular/core';
import { User } from '../models/classes/user';

Injectable({
  providedIn: 'root'
})

export class SharedService {

  users: User[];

  saveData(users){
    
    this.users = users;
   
  }
  getData():User[]{
    return this.users;
  }

}
