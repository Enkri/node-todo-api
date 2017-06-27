const {ObjectID} = require('mongodb')
const {Todo} = require('./../../models/todo.js');
const {User} = require('./../../models/user.js');
const jwt = require('jsonwebtoken');
const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email: 'chen_lin@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'chen123').toString()
  }]
}, {
  _id: userTwoId,
  email: 'jen@example.com',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoId, access: 'auth'}, 'chen123').toString()
  }]
}];

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
  _creator: userOneId

}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed:true,
  completeAt: 333,
  _creator: userTwoId
}];

const populateTodos = (done) => { // mocha hooks
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => {
    done()}
  );
}
const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save(); // so that the middleware can take effect
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers
}
