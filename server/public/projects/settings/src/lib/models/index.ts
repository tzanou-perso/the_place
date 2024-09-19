export interface Map {
  id: number
  name: string
  numCellRow: number
  numCellColumn: number
  createdAt?: string
  updatedAt?: string
}

export type Maps = Map[]
