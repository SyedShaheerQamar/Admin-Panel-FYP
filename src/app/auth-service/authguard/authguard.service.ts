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
    { permission: 'Domestic Shipment', route: ['/domestic-shipping', '/domestic-shipping-history/:id', '/add-domestic-shipping', '/update-domestic-shipping/:id', '/add-domestic-attachments/:id', '/view-domestic-shipment/:id'] },
    { permission: 'International Shipment By Road', route: ['/international-shipment-by-road', '/international-shipment-history-by-road/:id', '/add-international-shipment-by-road', '/update-international-shipment-by-road/:id', '/add-international-by-road-attachments/:id', '/international-summary-by-road-attachment/:id', '/view-international-road/:id'] },
    { permission: 'International Shipment By Air', route: ['/international-shipment-by-air', '/international-shipment-history-by-air/:id', '/add-international-shipment-by-air', '/update-international-shipment-by-air/:id', '/add-international-by-air-attachments/:id', '/international-summary-by-air-attachment/:id', '/view-international-air/:id'] },
    { permission: 'Domestic Summary', route: ['/domestic-summary', '/add-attachments/:id', '/update-domestic-shipping-for-summary/:id'] },
    { permission: 'International Summary By Air', route: ['/international-summary-by-air', '/update-international-air-shipping-for-summary/:id'] },
    { permission: 'International Summary By Road', route: ['/international-summary-by-road', '/update-international-road-shipping-for-summary/:id'] },
    { permission: 'User', route: ['/user', '/add-user', '/edit-user/:id'] },
    { permission: 'Driver', route: ['/driver', '/add-driver', '/edit-driver/:id'] },
    { permission: 'Category', route: ['/category'] },
    { permission: 'Location', route: ['/location', '/add-location', '/edit-location/:id'] },
    { permission: 'Location Port', route: ['/location-port', '/add-location-port', '/edit-location-port/:id'] },
    { permission: 'Shipment Status', route: ['/shipment-status', '/add-shipment-status', '/edit-shipment-status/:id'] },
    { permission: 'Vehicle Type', route: ['/vehicle-type', '/add-vehicle-type', '/edit-vehicle-type/:id'] },
    { permission: 'Role', route: ['/role', '/edit-role/:id'] },
    { permission: 'View Attachments', route: ['/view-attachments/:name/:through/:id'] },
    { permission: 'ShipmentRoutes', route: ['/domestic-routes', '/add-domestic-routes', '/update-domestic-routes/:id'] },
    { permission: 'ShipmentRoutesForAir', route: ['/international-routes-for-air', '/add-international-routes-for-air', '/update-international-routes-for-air/:id'] },
    { permission: 'ShipmentRoutesForRoad', route: ['/international-routes-for-road', '/add-international-routes-for-road', '/update-international-routes-for-road/:id'] },
    { permission: 'ProductField', route: ['/productFields', '/addProductField', '/updateProductField'] },
    { permission: 'Email Management', route: ['/emailManagement'] }

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

