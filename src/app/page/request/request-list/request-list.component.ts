import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { RequestService } from '../service/request.service';
// import { Location } from '../../../model/Location'
import { UserRequest } from 'src/app/model/user-request';

@Component({
  selector: 'app-location-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss'],
  providers:[MessageService]
})
export class RequestListComponent implements OnInit {


  constructor(private userRequestService:RequestService,private messageService:MessageService) { }
 
  items: MenuItem[] | undefined;
  // location!:Location[];
  visible: boolean = false;
  request!:UserRequest[];
  lID!:number

  ngOnInit() {
      this.items = [{ label: 'Request List'}];
      this.getAllUserRequest();
  }
  
  getAllUserRequest(){
    this.userRequestService.getAllUserRequest().subscribe((res:UserRequest[])=>{
      this.request=res;
      console.log(this.request);
      
    },error=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.body });
    })
  }

  deleteRequestByID(id:number){
    this.userRequestService.deleteUserRequsetByID(id).subscribe((res:UserRequest)=>{
      this.getAllUserRequest();
      this.visible = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Location is deleted on id '+res!.id!.toString()});
    },error=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.body });
    });
   }

  showDialog(id:number) {
    this.lID=id;
    this.visible = true;
  }

}
