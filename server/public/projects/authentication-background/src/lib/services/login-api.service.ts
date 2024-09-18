import { Injectable, inject } from '@angular/core'
import { Feathers, HttpDispatchService, fetchStore } from 'fetch'
import { User, listFeaturesType } from '../models'
import { authStore } from '../auth.store'
import { Router } from '@angular/router'
import { CRYDigesterMD5 } from '../crydigestmd5'
import { HttpCallType, HttpError, HttpResponse, isHttpError } from 'core'
import { HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { urlParamsListFeatures, urlParamsLogin, urlParamsLogout } from '../models/url_params'

@Injectable({
  providedIn: 'root'
})
/**
 * This class is used to define the interface for the LoginApiService.
 * It communicate with the fetch library who is designed to communicate with the server.
 */
export class LoginApiService {
  authStore = inject(authStore)
  fetchStore = inject(fetchStore)
  httpDispatchService: HttpDispatchService = inject(HttpDispatchService)
  featherService: Feathers = inject(Feathers)
  constructor(public router: Router) {}
  // TODO: add type of urlParams
  /**
   * This method to get the list of features from the server.
   * @returns {Promise<any>} - The list of features.
   */

  /**
   * This method is used to log in the user.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<boolean>} - True if the user is logged in, false otherwise.
   */
  async login({
    email,
    password,
    sessionId
  }: {
    email: string
    password?: string
    sessionId?: string
  }): Promise<boolean | HttpErrorResponse> {
    if (!email) {
      return new HttpErrorResponse({ error: 'email is required', status: 400 })
    }
    if (!password && !sessionId) {
      return new HttpErrorResponse({ error: 'password or sessionId is required', status: 400 })
    }
    console.log('login-api.service | login()', email, password, sessionId)
    let loginRequest: any | HttpErrorResponse
    if (!password && sessionId) {
      try {
        loginRequest = await this.featherService.authenticate({
          strategy: 'jwt',
          accessToken: sessionId
        })
      } catch (e) {
        console.error('error', JSON.parse(JSON.stringify(e)), e)
        return new HttpErrorResponse({
          error: JSON.parse(JSON.stringify(e)),
          status: JSON.parse(JSON.stringify(e)).code
        })
      }
    } else {
      try {
        loginRequest = await this.featherService.authenticate({
          strategy: 'local',
          email: email,
          password: password
        })
      } catch (e) {
        console.error('errorsf', e)
        return new HttpErrorResponse({
          error: JSON.parse(JSON.stringify(e)),
          status: JSON.parse(JSON.stringify(e)).code
        })
      }
    }
    console.log('loginRequest', isHttpError(loginRequest), loginRequest, typeof loginRequest)
    if (loginRequest instanceof HttpErrorResponse || !loginRequest) {
      console.error('login failed', typeof loginRequest, loginRequest)
      localStorage.removeItem('sessionId')

      return loginRequest as HttpErrorResponse
    }
    //get attribute username, realName, urlID
    let username = loginRequest['user'].email
    let realName = loginRequest['user'].email
    let sessionIdGetted = loginRequest['accessToken']
    const user: User = {
      name: realName,
      email: username,
      sessionId: sessionIdGetted
    }
    console.log('user', user)
    this.authStore.login({ user, callback: () => this.router.navigate(['/']) })
    localStorage.setItem('sessionId', user.sessionId)
    localStorage.setItem('email', user.email)

    return true
  }

  async loginWithSessionId({ sessionId, email }: { sessionId: string; email: string }) {
    console.log('login-api.service | loginWithSessionId()', sessionId, email)
    return this.login({ email, sessionId })
  }

  async logout(): Promise<boolean | HttpErrorResponse> {
    let sessionId = this.authStore.user()?.sessionId
    this.fetchStore.incrementReqSeq()
    let reqSeq = this.fetchStore.reqSeq()
    let urlParams: urlParamsLogout = {
      reqSeq: reqSeq.toString(),
      syncAsync: '1',
      random: reqSeq.toString()
    }
    const featureRequest = await this.featherService.logout().catch((e: HttpErrorResponse) => {
      return new HttpErrorResponse({ error: JSON.parse(JSON.stringify(e)), status: e.status })
    })
    console.log('logout', featureRequest)
    if (featureRequest instanceof HttpErrorResponse || !featureRequest) {
      return featureRequest
    }
    return true
  }
}
