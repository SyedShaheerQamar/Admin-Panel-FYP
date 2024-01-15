import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
// import { Driver } from 'src/app/model/Driver';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  providers:[MessageService]
})
export class AddCategoryComponent implements OnInit {
  items: MenuItem[] | undefined;
  driver={
    id: null,
    contactNumber: null,
    name: null,
    referenceNumber: null,
    status: null
  }
  constructor(private driverService:CategoryService,private messageService:MessageService,private router:Router) { }
  name!:string;
  contactNumber!:string;
  referenceNumber!:string;
  ngOnInit(): void {
    this.items = [{ label: 'Category List',routerLink:'/category'},{ label: 'Add Category'}];
  }

  onSubmit() {
    // this.driverService.addDriver(this.driver).subscribe(res=>{
    //   this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Driver is added' });
    //   setTimeout(() => {
    //     this.router.navigate(['/driver']);
    //   },800);
    // },error=>{
    //   this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.body });
    // })  
  }
  

}
