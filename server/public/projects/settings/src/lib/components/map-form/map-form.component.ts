import { CommonModule } from '@angular/common'
import { Component, Inject, OnInit, inject } from '@angular/core'
import { LoginApiService, User, authStore } from 'authentication-background'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { HttpError, SnackbarService, isHttpError } from 'core'
@Component({
  selector: 'lib-map-form',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    TranslateModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  templateUrl: './map-form.component.html',
  styleUrl: './map-form.component.scss'
})
/**
 * This class is used to define the login form component.
 * It is used to display the login form and to handle the login process.
 * @param {TranslateService} _translate - The translation service.
 */
export class MapFormComponent implements OnInit {
  constructor(private _translate: TranslateService) {}
  snackbarService = inject(SnackbarService)
  loginForm = inject(FormBuilder).group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })
  loginApiService = inject(LoginApiService)
  authStore = inject(authStore)
  currentYear = new Date().getFullYear().toString()
  buildVersionNumber = '0.0.1'
  buildVersionBuild = 1

  ngOnInit() {
    this.loginWithSessionId()
  }

  /* This method is used to log in the user with the session ID */
  async loginWithSessionId() {
    const sessionIdLocalStorage = localStorage.getItem('sessionId')
    const emailLocalStorage = localStorage.getItem('email')
    if (sessionIdLocalStorage && emailLocalStorage) {
      const loginRequest = await this.loginApiService.loginWithSessionId({
        sessionId: sessionIdLocalStorage,
        email: emailLocalStorage
      })
      if (!loginRequest) {
        console.error('login with sessionId failed')
        localStorage.removeItem('sessionId')
        localStorage.removeItem('email')
      }
    }
  }

  /* This method is used to log in the user */
  async login() {
    if (!this.loginForm.valid) {
      console.error('login-form.component | login() error', 'form is invalid', this.loginForm)
      return
    }
    const loginRequest = await this.loginApiService.login(this.loginForm.value as User)
    if (isHttpError(loginRequest) || !loginRequest) {
      const httpError: HttpError = loginRequest as HttpError
      console.error('login failed', typeof loginRequest, loginRequest)
      localStorage.removeItem('sessionId')
      localStorage.removeItem('email')
      this.snackbarService.openSnackBar({
        message: this._translate.instant(
          httpError.isDisplayable && httpError.text ? httpError.text : 'LOGIN_FAILED'
        ),
        // action: () => {
        //   console.log('snackbar action clicked');
        // },
        // actionLabel: 'Retry',
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'error-snackbar',
        duration: 5000
      })
    }
  }
}
