// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  mapDataValidator,
  mapPatchValidator,
  mapQueryValidator,
  mapResolver,
  mapExternalResolver,
  mapDataResolver,
  mapPatchResolver,
  mapQueryResolver
} from './map.schema'

import type { Application } from '../../declarations'
import { MapService, getOptions } from './map.class'
import { mapPath, mapMethods } from './map.shared'

export * from './map.class'
export * from './map.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const map = (app: Application) => {
  // Register our service on the Feathers application
  app.use(mapPath, new MapService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: mapMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(mapPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(mapExternalResolver),
        schemaHooks.resolveResult(mapResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(mapQueryValidator), schemaHooks.resolveQuery(mapQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(mapDataValidator), schemaHooks.resolveData(mapDataResolver)],
      patch: [schemaHooks.validateData(mapPatchValidator), schemaHooks.resolveData(mapPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [mapPath]: MapService
  }
}
