const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => { // routing

  // create todo item using the information that comes from the user
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});


app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({
      todos
    });
  }, (e) => {
    res.status(400).end(e);
  })
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (ObjectId.isValid(id)) {
    Todo.findById(id).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({todo: todo});
    }).catch((e) => {
      res.status(400).send();
    })
  } else {
    return res.status(404).send();
  }
});

app.delete('/todos/:id', (req, res) => {
  // get the id
  var id = req.params.id;
  console.log(typeof id);
  // validte the id -> not valid? return 404
  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }
  // remove todo by id
  Todo.findByIdAndRemove(id).then((doc) => {
    if (!doc) {
      return res.status(404).send();
    }
    res.status(200).send(doc);
  }).catch((e) => {
    res.status(400).send();
  });
    // success -> if no doc send 404 otherwise send doc back with 200
    // error -> 400 with empty body
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {
  app: app
}
