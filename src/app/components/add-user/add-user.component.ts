import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/classes/user';
import { Address } from 'src/app/models/classes/user-address';
import { Location } from 'src/app/models/classes/user-location';
import { SharedService } from 'src/app/services/shared.service';
import { Company } from 'src/app/models/classes/company';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: User = new User();
  users: User[] = [];
  address: Address = new Address();
  location: Location = new Location();
  company: Company = new Company();
  addUserFormGroup: FormGroup;

  constructor(private authenticationService: AuthenticationService, private formBuilder: FormBuilder, private sharedService: SharedService) { }

  ngOnInit() {
    this.buildAddUserForm();
  }
  
  postUser() {
    this.setUser();
    this.authenticationService.postUser(this.user).subscribe(response =>{
      if(response){
        var responseJsonString = JSON.stringify(response);
        var user = JSON.parse(responseJsonString);
       this.user.id = user.id;
       this.sharedService.getData().push(this.user);
       this.user = new User();
      }
    })
  }

  private setUser() {
    this.user.name = this.addUserFormGroup.value.name;
    this.user.username = this.addUserFormGroup.value.username;
    this.user.email = this.addUserFormGroup.value.email;
    this.user.phone = this.addUserFormGroup.value.phonenumber;
    this.setUserAddress();
    this.setUserLocation();
    this.setUserCompany();
  }

  private setUserAddress() {
    this.address.street = this.addUserFormGroup.value.streetaddress;
    this.address.suite = this.addUserFormGroup.value.suite;
    this.address.city = this.addUserFormGroup.value.city;
    this.address.zipcode = this.addUserFormGroup.value.zipcode;
    this.address.location = this.location;
    this.user.address = this.address;
  }

  private setUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.location.latitude = position.coords.latitude;
        this.location.longitude = position.coords.longitude;
      });
    } else {
      this.location.latitude = null;
      this.location.longitude = null;
    }
  }

  private setUserCompany() {
   this.company.name = this.addUserFormGroup.value.companyname;
   this.company.catchphrase = this.addUserFormGroup.value.catchphrase;
   this.company.bs = this.addUserFormGroup.value.bs;
   this.user.company = this.company;
  }

  private buildAddUserForm() {
    this.addUserFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      streetaddress: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      suite: ['', [Validators.minLength(5), Validators.maxLength(25)]],
      city: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      zipcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      companyname: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      catchphrase: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      bs: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]]
    })
  }
}
