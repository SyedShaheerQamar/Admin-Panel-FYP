import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserRequest } from 'src/app/model/user-request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private http:HttpClient) { }
  url=environment.baseurl;

  getAllUserRequest():Observable<UserRequest[]>{
    return this.http.get<UserRequest[]>(this.url.concat('/userRequest/getAll'));
  }

  deleteUserRequsetByID(id:number):Observable<UserRequest>{
    return this.http.delete<UserRequest>(this.url.concat('/userRequest/delete/',id.toString()));
  }
}
