var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // set promise
mongoose.connect('mongodb://localhost:27017/TodoApp'); // configuration done

module.exports = {
  mongoose: mongoose,
}
