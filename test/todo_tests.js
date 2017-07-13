const assert = require('assert')
const todos = require('../controllers/todos_controller.js')

// // Use Assert to Test the functionality of all your CRUD methods e.g.
assert.strictEqual(todos.list().length, 0, 'List should return an array of all todos')

var params = {
  name: 'First Todo',
  description: 'First Description',
  completed: false
}

var params2 = {
  name: 'Second Todo',
  description: 'First Description',
  completed: false
}

var params3 = {
  name: 'Only name' }

var params4 = {
  description: 'error here'
}

var params5 = {
  name: 'four'
}

////////////////////////////////
/////// CREATE ///////////////
////////////////////////////

// normal case: creating new todos
var firstTodo = todos.create(params)
assert.strictEqual(todos.list().length, 1, 'List should have one after create')

// normal case: params contains 3 props
assert.strictEqual(firstTodo.hasOwnProperty('name'), true)

// normal case
// actual firstTodo._id // expected? true
assert.strictEqual(firstTodo.hasOwnProperty('_id'), true, 'every todo needs to have _id property')

// normal case
// secondTodo._id is unique
var secondTodo = todos.create(params2)
assert.notStrictEqual(secondTodo._id, firstTodo._id, '_id prop needs to be unique')

// normal case
// new todo without name in param, should have default description and completed
var onlyNameTodo = todos.create(params3)
var defaultDescription = 'my todo description'
var defaultCompleted = false
assert.strictEqual(onlyNameTodo.description, defaultDescription, 'Description should be default')
assert.strictEqual(onlyNameTodo.completed, defaultCompleted, 'Completed should be default')

// error case
// cannot create new todo without name property
var noNameTodo = todos.create(params4)
assert.strictEqual(noNameTodo, false, 'Name is required')

// error case
// cannot create new todo with short name
var shortTodo = todos.create(params5)
assert.strictEqual(shortTodo, false, 'Name is too short')


////////////////////////////////
///////READ ///////////////
////////////////////////////

//normal case
// return all todos
var allTodos = todos.create(params)
assert.strictEqual(allTodos, )

// normal case
// Should return the Todo Object with the specified id

// first create a list of todos
var showTodo = todos.create(params)
var showTodoID = showTodo._id
assert.strictEqual(todos.show(id), showTodoID, '')

// normal case
// Should return null if no TODO with that id exists
assert.strictEqual(todos.show(id), null, '')

////////////////////////////////
/////// UPDATE /////////////////
////////////////////////////////


// Should be able to update the Todo with the given id, using the
// following KVPs (Key-Value Pairs) in the updatedParams object:
//var updateTodo = todos.show(showTodoID)
var updateTodo = todos.create(params)
var updateTodoID = updateTodo._id
assert.strictEqual(todos.update(updateTodoID,params2), params2, 'update() should be equal to new params')

// Should allow name field to be updated
assert.strictEqual(todos.update(updateTodoID,params2), params2, 'update() should be equal to new params')



////////////////////////
/// INSTRUCTOR SOLUTION
///////////////////////

// normal case
// show todo with correct id, returns the todo object
assert.strictEqual(todos.show(firstTodo._id), firstTodo, 'Show doesn\`t return the correct todo object') // error case
// show false if todo is not found

assert.strictEqual(todos.show(‘123’), false, 'Show false if todo is not found') 

var newParams1 = {
  description: 'new description'
}

var newParams2 = {
  completed: true
}

var newParams3 = {
  name: 'new name'
}

var newParams4 = {
  name: 'four'
} // normal case

// todos.update() update each params individually
todos.update(secondTodo._id, newParams1)
var updatedSecondTodo = todos.show(secondTodo._id)
assert.strictEqual(updatedSecondTodo.description, ‘new description’, ‘Update doesn\‘ t update description’)

todos.update(secondTodo._id, newParams2)
var updatedSecondTodo = todos.show(secondTodo._id)
assert.strictEqual(updatedSecondTodo.completed, true, 'Update doesn\‘ t update completed')

todos.update(secondTodo._id, newParams3)
var updatedSecondTodo = todos.show(secondTodo._id)
assert.strictEqual(updatedSecondTodo.name, 'new name', 'Update doesn\‘ t update name') // error case

// update name needs to follow name property convention
todos.update(secondTodo._id, newParams4)
assert.strictEqual(todos.update(secondTodo._id, newParams4), false, ‘Update should fail
  if name is too short’) // normal case

// destroy function should remove the object from the array
todos.destroy(firstTodo._id)
assert.strictEqual(todos.show(firstTodo._id), false, ‘FirstTodo should not exist after destroying’) // error case

// destroy function should return false if object doesn’t exist
assert.strictEqual(todos.destroy(123), false, 'Destroy doesnt return false if id is invalid')

// normal case
// destroyAll emptied the todos array
todos.destroyAll()
assert.strictEqual(todos.list().length, 0, ‘Todo list should be empty after destroyAll’)
