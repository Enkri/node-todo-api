var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // set promise
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');
module.exports = {
  mongoose: mongoose,
}
