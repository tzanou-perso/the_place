// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('map', (table) => {
    table.increments('id')

    table.string('name').notNullable()
    table.integer('numCellWidth').notNullable()
    table.integer('numCellHeight').notNullable()
    table.integer('cellSize').notNullable()
    table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now())
    table.dateTime('updatedAt').notNullable().defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('map')
}
