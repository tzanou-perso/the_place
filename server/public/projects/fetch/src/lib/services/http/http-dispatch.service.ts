import { Injectable, NgModule, inject } from '@angular/core'
import { HttpAbstractService } from './http.abstract.service'
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { HttpService } from './http.service'
import { HttpError, HttpResponse, HttpCallType } from 'core'
import { convertXML } from 'simple-xml-to-json'

@Injectable({
  providedIn: 'root'
})
/**
 * This is a sample class representing a person.
 */
export class HttpDispatchService extends HttpAbstractService {
  serverUrl = 'http://localhost:3030'
  HttpService = inject(HttpService)
  override async request({
    url,
    headers,
    type,
    body,
    urlParams
  }: {
    url: string
    type: HttpCallType
    headers?: HttpHeaders | undefined
    body?: any
    urlParams?: any
  }): Promise<HttpResponse | HttpErrorResponse> {
    const fullUrl = url.startsWith('http') ? url : `${this.serverUrl}${url}`
    console.log('Http.service dispatch | GET', fullUrl)
    return new Promise<HttpResponse | HttpError>(async (resolve, reject) => {
      const response = await this.HttpService.request({
        url: fullUrl,
        headers,
        type: type,
        body,
        urlParams
      }).catch((error: HttpError) => {
        console.error('Http.service dispatch | GET error', error, fullUrl)
        reject(error)
        return error
      })
      // let xmlConverted: HttpResponse = convertXML(response)
      console.log('Http.service | GET response : ', response, fullUrl)
      // const error: HttpError = new HttpError(
      //   xmlConverted.XIMSS?.children[0]?.response?.errorText,
      //   !Number.isNaN(Number(xmlConverted.XIMSS?.children[0]?.response?.errorNum))
      //     ? Number(xmlConverted.XIMSS?.children[0]?.response?.errorNum)
      //     : undefined
      // )
      // if (error.text || error.code) {
      //   return reject(error)
      // } else {
      // parsing succeeded
      console.log('Http.service | GET xmlConverted success : ', response, fullUrl)
      return resolve(response as HttpResponse)
      // }
    }).catch((error: HttpErrorResponse) => {
      console.error('Http.service | GET promise error', error, fullUrl)
      return error
    })
    // return Promise.resolve();
  }
}
