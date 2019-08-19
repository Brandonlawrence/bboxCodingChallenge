import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/classes/user';
import { SharedService } from 'src/app/services/shared.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Address } from 'src/app/models/classes/user-address';
import { Location } from 'src/app/models/classes/user-location';
import { Company } from 'src/app/models/classes/company';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  
  users: User[] = [];
  address: Address = new Address();
  location: Location = new Location();
  company: Company = new Company();
  addUserFormGroup: FormGroup;
  constructor(private authenticationService: AuthenticationService, private sharedService: SharedService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getUsers();
    this.buildAddUserForm();
  }
  
  private getUsers() {
    this.authenticationService.getUsers().subscribe(userList => {
      userList.filter(user => {
        var userTemplate = new User();
        this.sharedService.saveData(this.users);
        userTemplate.id = user.id;
        userTemplate.name = user.name;
        userTemplate.email = user.email;
        userTemplate.username = user.username;
        userTemplate.address = user.address;
        userTemplate.company = user.company;
        this.users.push(userTemplate);
      })
    })
  }

 private deleteUser(userId) {
    alert('Are You Sure You Want To Delete This User?');
    this.authenticationService.deleteUser(userId).subscribe(response=>{
      if(response){
        this.filterUsers(userId, this.users);
        this.sharedService.saveData(this.users);
      }
    });
  }

  private filterUsers(userId: string, users: Array<User>){
    for (var i = 0; i < users.length; i++) {
      const userIndex = users[i];
      if (userId === userIndex.id) {
        this.users.splice(i, 1);
      }
    }
  }
 
  private buildAddUserForm() {
    this.addUserFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      streetAddress: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      suite: ['', [Validators.minLength(5), Validators.maxLength(25)]],
      city: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      zipcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
    })
  }
}
