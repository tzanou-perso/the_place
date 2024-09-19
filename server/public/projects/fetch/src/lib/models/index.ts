export interface FeatherResponseData {
  data: unknown
  limit: Number
  skip: Number
  total: Number
}

export type FeatherResponseDataList = FeatherResponseData[]

export interface FeatherPagination {
  currentPage: number
  limit: number
  skip: number
  total: number
  order?: number
  like?: string
}
