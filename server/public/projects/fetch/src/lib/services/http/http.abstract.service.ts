import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { HttpCallType } from 'core';

/**
 * This abstract class is used to define the interface for the HttpService.
 * it is actually used to communicate with the server over http-ximss protocol and will be implemented by the HttpService.
 * in future it can be used to communicate with other protocols.
 */
@Injectable({
  providedIn: 'root',
})
export abstract class HttpAbstractService {
  constructor(http: HttpClient) {}
  /**
   * This method is used to post or get data to a server.
   * @param {string} url - The URL to post the data to. It can be a full URL to override the server url or a path, if so it will then concatenate with the server url.
   * @param {any} body - The body of the request.
   * @param {HttpHeaders} headers - The headers to add to the request.
   */
  abstract request({
    url,
    headers,
    body,
    type,
  }: {
    url: string;
    headers?: HttpHeaders;
    body?: any;
    type: HttpCallType;
  }): Promise<any>;
}
