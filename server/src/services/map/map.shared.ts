// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Map, MapData, MapPatch, MapQuery, MapService } from './map.class'

export type { Map, MapData, MapPatch, MapQuery }

export type MapClientService = Pick<MapService<Params<MapQuery>>, (typeof mapMethods)[number]>

export const mapPath = 'map'

export const mapMethods: Array<keyof MapService> = ['find', 'get', 'create', 'patch', 'remove']

export const mapClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(mapPath, connection.service(mapPath), {
    methods: mapMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [mapPath]: MapClientService
  }
}
