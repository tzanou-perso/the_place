import { Injectable } from '@angular/core'

import { rx } from 'feathers-reactive'
import io from 'socket.io-client'

import { feathers, Application } from '@feathersjs/feathers'
import feathersSocketIOClient from '@feathersjs/socketio-client'
import feathersAuthClient from '@feathersjs/authentication-client'
import feathersAuthClient2 from '@feathersjs/authentication-client'

/**
 * Simple wrapper for feathers
 */
@Injectable({
  providedIn: 'root'
})
export class Feathers {
  private _feathers: Application = feathers() // init socket.io
  private _socket = io('http://localhost:3030') // init feathers
  //   private feathersAuthClient = require('@feathersjs/authentication-client').default

  constructor() {
    this._feathers
      .configure(feathersSocketIOClient(this._socket)) // add socket.io plugin
      .configure(
        feathersAuthClient({
          // add authentication plugin
          storage: window.localStorage
        })
      )
      .configure(
        rx({
          // add feathers-reactive plugin
          idField: '_id'
        })
      )
  }

  // expose services
  public service(name: string) {
    return this._feathers.service(name)
  }

  //   // expose authentication
  public authenticate(credentials?: any): Promise<any> {
    return (this._feathers as any).authenticate(credentials)
  }

  //   // expose logout
  public logout() {
    return (this._feathers as any).logout()
  }
}
