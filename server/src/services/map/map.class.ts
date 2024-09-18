// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Map, MapData, MapPatch, MapQuery } from './map.schema'

export type { Map, MapData, MapPatch, MapQuery }

export interface MapParams extends KnexAdapterParams<MapQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class MapService<ServiceParams extends Params = MapParams> extends KnexService<
  Map,
  MapData,
  MapParams,
  MapPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'map'
  }
}
