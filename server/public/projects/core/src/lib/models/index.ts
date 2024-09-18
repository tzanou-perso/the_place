export interface HttpResponse {
  [key: string]: any
}

export type HttpResponses = HttpResponse[]

export enum HttpCallType {
  get = 'get',
  post = 'post'
}
