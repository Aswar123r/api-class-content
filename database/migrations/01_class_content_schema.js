'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClassContentSchema extends Schema {
  up () {
    this.create('class_contents', (table) => {
      table.increments()
      table.string('Class_name').notNullable().unique()
      table.string('Description').notNullable()
    })
  }

  down () {
    this.drop('class_contents')
  }
}

module.exports = ClassContentSchema
