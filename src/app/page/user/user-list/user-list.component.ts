import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
// import { User } from 'src/app/model/User';
import { UserService } from '../service/user.service';
import { UserInformation } from 'src/app/model/user-information';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers:[MessageService]
})
export class UserListComponent implements OnInit {

  items: MenuItem[] | undefined;
  // users!:User[]
  visible: boolean = false;
  uID!:number
  userInfo!:UserInformation[];

  constructor(private userService:UserService,private messageService:MessageService) { }
  
  ngOnInit() {
      this.items = [{ label: 'User List'}];
      this.getAllUser();
  }

  getAllUser(){
    this.userService.GetAllUserFromDatabase().subscribe((res:UserInformation[]) => {
      console.log(res);
      
      this.userInfo = res;
      
    },error=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.body });
    });
   }

   deleteUserByID(id:number){
    this.userService.DeleteUserFromDatabase(id).subscribe((res:UserInformation)=>{
      this.visible = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User is deleted on id '+id});
      this.getAllUser();
    },error=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.body });
    });
    
   }

  showDialog(id:number) {
    this.uID=id;
    this.visible = true;
  }

  showUserByStatus(status : number){
    this.userService.GetUserByStatus(status).subscribe((res:UserInformation[]) => {      
      this.userInfo = res;
    },error=>{
      this.messageService.add({ severity: 'error', summary: 'No User Available', detail: error.error.body });
    });
  }
  
}
