import { CommonModule } from '@angular/common'
import { Component, Inject, OnInit, inject } from '@angular/core'
import { LoginApiService, User, authStore } from 'authentication-background'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { HttpError, SnackbarService, isHttpError, HttpResponse } from 'core'
import { HttpErrorResponse } from '@angular/common/http'
@Component({
  selector: 'lib-login-form',
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
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
/**
 * This class is used to define the login form component.
 * It is used to display the login form and to handle the login process.
 * @param {TranslateService} _translate - The translation service.
 */
export class LoginFormComponent implements OnInit {
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
      console.log('login with sessionId', sessionIdLocalStorage, emailLocalStorage)
      const loginRequest = await this.loginApiService.loginWithSessionId({
        sessionId: sessionIdLocalStorage,
        email: emailLocalStorage
      })
      console.log('login with sessionId', loginRequest)
      if (!loginRequest || loginRequest instanceof HttpErrorResponse) {
        console.error('login with sessionId failed')
        localStorage.removeItem('sessionId')
        localStorage.removeItem('email')
        this.snackbarService.openSnackBar({
          message: this._translate.instant(
            typeof loginRequest === 'object' && loginRequest.error.message
              ? loginRequest.error.message
              : 'LOGIN_FAILED'
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

  /* This method is used to log in the user */
  async login() {
    if (!this.loginForm.valid) {
      console.error('login-form.component | login() error', 'form is invalid', this.loginForm)
      return
    }
    const loginRequest = await this.loginApiService.login(this.loginForm.value as User)
    if (loginRequest instanceof HttpErrorResponse || !loginRequest) {
      const httpError: HttpErrorResponse = loginRequest as HttpErrorResponse
      console.error('login failed', typeof loginRequest, loginRequest)
      localStorage.removeItem('sessionId')
      localStorage.removeItem('email')
      this.snackbarService.openSnackBar({
        message: this._translate.instant(httpError.error.message ? httpError.error.message : 'LOGIN_FAILED'),
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
