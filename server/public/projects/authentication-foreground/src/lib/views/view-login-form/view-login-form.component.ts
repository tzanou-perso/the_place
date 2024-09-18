import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginFormComponent } from '../../../public-api';

@Component({
  selector: 'lib-view-login-form',
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  templateUrl: './view-login-form.component.html',
  styleUrl: './view-login-form.component.scss',
})
export class ViewLoginFormComponent {}
