const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js');

var id = '593eab5208a0f8eef08a5a9a11';

// if (!ObjectId.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('todos',todos);
// })
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('todo', todo);
// })
//
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('todo by ID', todo);
// }).catch((e) => {
//   console.log(e);
// })

User.findById('5939ae5a993c1becd9aa06c8').then((user) => {
  if (!user) {
    return console.log('Unable to find user');
  }
  console.log('User', JSON.stringify(user, undefined, 2));
}, (e) => {
  console.log(e);
})
