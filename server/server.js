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
        res.status(404).send().end();
      }
      res.send({todo: todo});
    }).catch((e) => {
      res.status(400).send();
    })
  } else {
    return res.status(404).send();
  }
})

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {
  app: app
}
