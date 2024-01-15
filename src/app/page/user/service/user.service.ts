import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInformation } from 'src/app/model/user-information';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient) { }
  url=environment.baseurl;

  GetAllUserFromDatabase():Observable<UserInformation[]>{
    debugger
    return this.http.get<UserInformation[]>(this.url.concat("/user/getAll"));
  }

  DeleteUserFromDatabase(id:number):Observable<UserInformation>{
    return this.http.delete<UserInformation>(this.url.concat("/user/delete/", id.toString()))
  }

  GetUserByStatus(status : number):Observable<UserInformation[]>{
    return this.http.get<UserInformation[]>(this.url.concat("/user/get-status/", status.toString()));
  }

}
