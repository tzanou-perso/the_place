import { Routes } from '@angular/router';
import { ViewLoginFormComponent } from './views/view-login-form/view-login-form.component';

export const authenticationRoutes: Routes = [
  {
    path: '',
    component: ViewLoginFormComponent,
  },
];
