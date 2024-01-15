import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { CategoryService } from '../service/category.service';
// import { Driver } from 'src/app/model/Driver';
import { PaginatedResponse } from 'src/app/model/PaginatedResponse';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-driver-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  providers:[MessageService]
})
export class CategoryListComponent implements OnInit {
  visible!: boolean;
  dId!:number;
  items: MenuItem[] | undefined;
  // drivers!:Driver[];
  itemCategory!:Category[];

  constructor(private categoryService:CategoryService,private messageService:MessageService) { }
  
 

  ngOnInit() {
      this.items = [{ label: 'Category List'}];
      this.getCategory();
  }
  
  getCategory(){
   this.categoryService.getAllCategory().subscribe((res:Category[])=>{    
    this.itemCategory=res;
    console.log(this.itemCategory);
    
    
   },error=>{
    this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.body });
   })
  }

  deleteCategoryByID(id:number){
    this.categoryService.deleteCategoryByID(id).subscribe((res:Category)=>{
      this.visible = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Driver is deleted on id '+res!.id!.toString()});
      this.getCategory();
    },error=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.body });
    });
   }

  showDialog(id:number) {
    this.dId=id;
    this.visible = true;
  }

}
