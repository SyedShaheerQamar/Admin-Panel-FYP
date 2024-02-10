import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private router: Router) {

  }

  private permissionName!: string | null;
  // private token = localStorage.getItem('accessToken');
  // private decodeToken = this.getDecodedAccessToken(this.token!)
  // private userPermissions: string[] = this.decodeToken.PERMISSIONS;

  PermissionRoutes: { permission: string, route: string[] }[] = [
    { permission: 'Dash Board', route: ['/home', '/'] },
    { permission: 'User', route: ['/user', '/add-user'] },
    { permission: 'Category', route: ['/category', '/add-category'] },
    { permission: 'Request', route: ['/request'] },
    
  ]


  isAuthenticated(state: RouterStateSnapshot): boolean {
    
    const token = localStorage.getItem('accessToken');

    let userPermissions: string[]|null =null
    if(token){
    const decodeToken = this.getDecodedAccessToken(token!)
     userPermissions= decodeToken.PERMISSIONS;
    }
    
    if (this.tokenExists()) {

      this.permissionName = this.getPermissionByUrl(state.url);

      if (userPermissions!.includes(this.permissionName!)) {

        return true;
      }
      else if (state.url == '/international-tile' && (this.hasPermission('International Shipment By Road') || this.hasPermission('International Shipment By Air'))) {
        return true;
      }
      else {
        this.router.navigate(['/unauthorized']);
        return false;
      }
    } else {
      
      this.router.navigate(['/login']);
      return false;
    }
  }

  private getPermissionByUrl(url: string): string | null {

    for (const permissionRoute of this.PermissionRoutes) {
      if (permissionRoute.route.some(route => this.isRouteMatch(url, route))) {
        return permissionRoute.permission;
      }
    }

    return null; // If no match found
  }

  private isRouteMatch(url: string, route: string): boolean {
    const regex = new RegExp('^' + route.replace(/:[^\/]+/g, '[^\/]+') + '$');
    return regex.test(url);
  }

  private tokenExists(): boolean {
    const token = localStorage.getItem('accessToken');

    return !!token;
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      console.error('Error decoding JWT token:' + Error);
    }
  }
  hasPermission(requiredPermission: string): boolean {
    const token = localStorage.getItem('accessToken');
    const decodeToken = this.getDecodedAccessToken(token!)
    const userPermissions: string[] = decodeToken.PERMISSIONS;
    return userPermissions.includes(requiredPermission);
  }
}


