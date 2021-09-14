'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SectionSchema extends Schema {
  up () {
    this.create('sections', (table) => {
      table.increments()
      table.string('Section').notNullable().unique()
      table.integer('id_class').unsigned()
      table.foreign('id_class').references('class_contents.id')
    })
  }

  down () {
    this.drop('sections')
  }
}

module.exports = SectionSchema
