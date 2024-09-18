import { Routes } from '@angular/router'
import { authGuardHome, authGuardLogin } from 'authentication-background'
import { HomeComponent } from './components/home/home.component'

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuardHome],
    children: [
      {
        path: 'mail',
        loadChildren: () => import('mail').then((item) => item.mailRoutes),
        canActivate: [authGuardHome]
      },
      {
        path: 'settings',
        loadChildren: () => import('settings').then((item) => item.settingsRoutes),
        canActivate: [authGuardHome]
      },
      {
        path: 'search',
        loadChildren: () => import('search').then((item) => item.searchRoutes),
        canActivate: [authGuardHome]
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('authentication-foreground').then((item) => item.authenticationRoutes),
    canActivate: [authGuardLogin]
  }
]
