
const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js');

// Todo.remove({}).then((result) => {
//   console.log(result);
// })

// Todo.findOneAndRemove
Todo.findByIdAndRemove('59402c4dc3e56141f6756dac').then((todo) => {
  console.log(todo);
});
