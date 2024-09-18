import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { PermissionService } from '../services/permission/permission.service';

// This guard is used to protect the routes that require authentication
export const authGuardHome: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(PermissionService).canActivate({ isLoginAuthGuard: false });
};

// This guard is used to protect the routes that require no authentication
// and redirect to the login page if the user is not authenticated
export const authGuardLogin: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(PermissionService).canActivate({ isLoginAuthGuard: true });
};
