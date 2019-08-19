import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/classes/user';
import { Address } from '../models/classes/user-address';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  httpHeaders: HttpHeaders;
  endPoint = 'https://jsonplaceholder.typicode.com/';
  user: User = new User();
  address: Address = new Address();
 
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any>{
    const userEndpoint = this.endPoint + 'users';
    return this.http.get(userEndpoint);
  }

  postUser(user){
    const postEndPoint = this.endPoint + 'users';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json; charset=UTF-8'
      })
    }
   return this.http.post(postEndPoint, JSON.stringify(user), httpOptions)
  }

  deleteUser(userId: string){
    const deleteEndPoint = this.endPoint + 'users/' + userId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.http.delete(deleteEndPoint, httpOptions);
  }
}
