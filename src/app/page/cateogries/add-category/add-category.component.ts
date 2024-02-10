import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  providers:[MessageService],
})
export class AddCategoryComponent implements OnInit {
  items: MenuItem[] | undefined;
  
  constructor(private driverService:CategoryService,private messageService:MessageService,private router:Router) { }

  Categoryname!:string;

  icons: any = [
    { name: 'TEST 1' },
    { name: 'TEST 2' },
    { name: 'TEST 3' },
    { name: 'TEST 4' },
    { name: 'TEST 5' }
  ];

  background: any = [
    { name: 'TEST 1' },
    { name: 'TEST 2' },
    { name: 'TEST 3' },
    { name: 'TEST 4' },
    { name: 'TEST 5' }
  ];

  selectedIcon: any;
  selectedBackground: any;


  ngOnInit(): void {
    this.items = [{ label: 'Category List',routerLink:'/category'},{ label: 'Add Category'}];
  }

  onSubmit() {
    console.log(this.selectedIcon, this.selectedBackground, this.Categoryname);
  }
  

}
