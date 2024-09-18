import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { MapFormCreateComponent } from '../../components/map-form-create/map-form-create.component'
// import { MapFormCreateComponent } from '../../../public-api'

@Component({
  selector: 'lib-home-settings',
  standalone: true,
  imports: [CommonModule, MapFormCreateComponent],
  templateUrl: './home-settings.component.html',
  styleUrl: './home-settings.component.css'
})
export class HomeSettingsComponent {}
