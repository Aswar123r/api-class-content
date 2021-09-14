'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
Route.group(() => {
  Route.get('insert', 'ContontController.insert')
  Route.get('insertv2', 'ContontController.insertv2')
  Route.get('insertv3', 'ContontController.insertv3')
  Route.get('data_kelas', 'ContontController.data_kelas')
  Route.get('data_class', 'ContontController.data_class')
  Route.delete('delete', 'ContontController.deleteClass')
  Route.delete('deleteSection', 'ContontController.deleteSection')
  Route.delete('deleteVideo', 'ContontController.deleteVideo')
  Route.get('updateClass', 'ContontController.updateClass')
}).prefix('v1/classcontent')