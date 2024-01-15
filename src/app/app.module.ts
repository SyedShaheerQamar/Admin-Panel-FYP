import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './page/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardHeadComponent } from './components/dashboard-head/dashboard-head.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AddCategoryComponent } from './page/cateogries/add-category/add-category.component';
import { CategoryListComponent } from './page/cateogries/category-list/category-list.component';
import { RequestListComponent } from './page/request/request-list/request-list.component';
import { UserListComponent } from './page/user/user-list/user-list.component';
import { CommonModule } from '@angular/common';
import {FormsModule} from'@angular/forms'
import {
  HTTP_INTERCEPTORS,
  HttpClientModule
} from '@angular/common/http';
// import { provideRouter, withHashLocation } from '@angular/router';
import { TokenInterceptor } from './auth-service/interceptor/token.interceptor';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { PaginatorModule } from 'primeng/paginator';
import { BadgeModule } from 'primeng/badge';

//primeng imports
import { ChartModule } from 'primeng/chart';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { NgxUiLoaderModule,NgxUiLoaderHttpModule} from "ngx-ui-loader";
import { DialogModule } from 'primeng/dialog';
import { ChipsModule } from 'primeng/chips';



@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    DashboardHeadComponent,
    DashboardComponent,
    SidebarComponent,
    AddCategoryComponent,
    CategoryListComponent,
    RequestListComponent,
    UserListComponent,
  ],
  imports: [
    ChipsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    DropdownModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    BreadcrumbModule,
    MultiSelectModule,
    PasswordModule,
    InputSwitchModule,
    CalendarModule,
    FileUploadModule,
    ToastModule,
    ChartModule,
    NgxUiLoaderModule,
    DialogModule,
    InputNumberModule,
    PaginatorModule,
    BadgeModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true
    })
  ],

  providers: [
    // AuthGuard,
    // DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }, // Register the AuthInterceptor
    // provideRouter(routes, withHashLocation()),
],
  bootstrap: [AppComponent]
})
export class AppModule { }
