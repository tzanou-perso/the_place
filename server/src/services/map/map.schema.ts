// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { MapService } from './map.class'

// Main data model schema
export const mapSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    numCellRow: Type.Number(),
    numCellColumn: Type.Number(),
    createdAt: Type.String({ format: 'date-time', default: () => new Date().toISOString() }),
    updatedAt: Type.String({ format: 'date-time', default: () => new Date().toISOString() })
  },
  { $id: 'Map', additionalProperties: false }
)
export type Map = Static<typeof mapSchema>
export const mapValidator = getValidator(mapSchema, dataValidator)
export const mapResolver = resolve<Map, HookContext<MapService>>({})

export const mapExternalResolver = resolve<Map, HookContext<MapService>>({})

// Schema for creating new entries
export const mapDataSchema = Type.Pick(mapSchema, ['name', 'numCellRow', 'numCellColumn'], {
  $id: 'MapData'
})
export type MapData = Static<typeof mapDataSchema>
export const mapDataValidator = getValidator(mapDataSchema, dataValidator)
export const mapDataResolver = resolve<Map, HookContext<MapService>>({})

// Schema for updating existing entries
export const mapPatchSchema = Type.Partial(mapSchema, {
  $id: 'MapPatch'
})
export type MapPatch = Static<typeof mapPatchSchema>
export const mapPatchValidator = getValidator(mapPatchSchema, dataValidator)
export const mapPatchResolver = resolve<Map, HookContext<MapService>>({})

// Schema for allowed query properties
export const mapQueryProperties = Type.Pick(mapSchema, [
  'id',
  'name',
  'numCellRow',
  'numCellColumn',
  'createdAt',
  'updatedAt'
])
export const mapQuerySchema = Type.Intersect(
  [
    querySyntax(mapQueryProperties, {
      name: {
        $like: Type.String()
      }
    }),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type MapQuery = Static<typeof mapQuerySchema>
export const mapQueryValidator = getValidator(mapQuerySchema, queryValidator)
export const mapQueryResolver = resolve<MapQuery, HookContext<MapService>>({})
