import { Routes } from '@angular/router'
import { HomeSettingsComponent } from './views/home-settings/home-settings.component'
import { MapFormCreateComponent } from './components/map-form-create/map-form-create.component'
import { MapFormComponent } from './components/map-form/map-form.component'

export const settingsRoutes: Routes = [
  {
    path: '',
    component: HomeSettingsComponent
  }
]
