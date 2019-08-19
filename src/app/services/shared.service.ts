import { Injectable } from '@angular/core';
import { User } from '../models/classes/user';

Injectable({
  providedIn: 'root'
})

export class SharedService {

  sharingData: User[];

  saveData(users){
    
    this.sharingData = users;
   
  }
  getData():User[]{
      console.log("SHARING ", this.sharingData);
    return this.sharingData;
  }

}
