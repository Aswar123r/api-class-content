'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VideoSchema extends Schema {
  up () {
    this.create('videos', (table) => {
      table.increments('id').primary()
      table.string('Title').notNullable().unique()
      table.string('Video_link').notNullable()
      table.integer('id_section').unsigned()
      table.foreign('id_section').references('sections.id')
    })
  }

  down () {
    this.drop('videos')
  }
}

module.exports = VideoSchema
