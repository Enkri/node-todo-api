var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // set promise
let db = {
  localhost: 'mongodb://localhost:27017/TodoApp',
  mlab: 'mongodb://Enkri_:qwertyuiop@ds149268.mlab.com:49268/todoapp'
};
mongoose.connect(db.mlab || db.localhost);
module.exports = {
  mongoose: mongoose,
}
