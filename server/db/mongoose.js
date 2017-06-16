var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // set promise
mongoose.connect(process.env.MONGODB_URI);
module.exports = {
  mongoose: mongoose,
}
