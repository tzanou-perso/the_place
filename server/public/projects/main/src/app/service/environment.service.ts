import { Injectable, NgModule } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  get buildVersionNumber(): string {
    return environment.build_version_number;
  }
  get buildVersionBuild(): string {
    return environment.build_version_build;
  }
}
