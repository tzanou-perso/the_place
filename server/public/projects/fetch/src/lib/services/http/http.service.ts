import { Injectable, NgModule } from '@angular/core'
import { HttpAbstractService } from './http.abstract.service'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { map, tap } from 'rxjs'
import { HttpCallType, HttpResponse } from 'core'

/*
 * This service is used to communicate with the server.
 */

@Injectable({
  providedIn: 'root'
})
export class HttpService extends HttpAbstractService {
  constructor(private http: HttpClient) {
    super(http)
  }

  /**
   * This method is used to post or get data to a server.
   * @param {string} url - The URL to post the data to. It can be a full URL to override the server url or a path, if so it will then concatenate with the server url.
   * @param {any} body - The body of the request.
   * @param {HttpHeaders} headers - The headers to add to the request.
   * @param {HttpCallType} type - The type of the request.
   * @param {HttpParams} urlParams - The URL parameters to add to the request.
   */
  override request({
    url,
    headers,
    type,
    body,
    urlParams
  }: {
    url: string
    type: HttpCallType
    headers?: HttpHeaders
    body?: any
    urlParams?: HttpParams
  }): Promise<HttpResponse> {
    console.log('type', type, typeof type)
    let headersTo = new HttpHeaders({
      Accept: '*/*',
      'Accept-Language': 'fr-FR,fr'
    })

    if (headers) {
      // Combine the headers
      const keys = headers.keys()
      keys.forEach((key) => {
        headersTo = headersTo.set(key, headers.get(key)!)
      })
    }
    return new Promise<HttpResponse>((resolve, reject) => {
      let request
      if (type === HttpCallType.post) {
        headersTo = headersTo.set('Content-Type', 'application/json')
        request = this.http.post(url, body, {
          headers: headersTo,
          responseType: 'json'
        })
      } else {
        console.log('urlParams', urlParams)
        request = this.http.get(url, {
          headers: headersTo,
          responseType: 'json',
          params: urlParams
        })
      }
      request
        .pipe(
          map((response) => {
            // Specify the type of response as string
            console.log('response', response)
            return response
          }),
          tap({
            next: (response: HttpResponse) => {
              // Specify the type of response as string
              console.log('response', response)
              resolve(response)
              return response
              // Handle the response here
            },
            error: (error) => {
              console.error('errors', error)
              reject(error)
              return error
              // Handle the error here
            }
          })
        )
        .subscribe()
      console.log('request', request)
    })
  }
}
