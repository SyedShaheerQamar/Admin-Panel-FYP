import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './page/login-form/login-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryListComponent } from './page/cateogries/category-list/category-list.component';
import { AddCategoryComponent } from './page/cateogries/add-category/add-category.component';
import { RequestListComponent } from './page/request/request-list/request-list.component';
import { UserListComponent } from './page/user/user-list/user-list.component';
import { AuthGuard } from './auth-service/authguard/authguard';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    path: 'home',
    component: DashboardComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'category',
    component: CategoryListComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'add-category',
    component: AddCategoryComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'request',
    component: RequestListComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'user',
    component: UserListComponent,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
