const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server.js');
const {Todo} = require('./../models/todo.js');

const todos = [{
  text: 'First test todo'
}, {
  text: 'Second test todo'
}];

beforeEach((done) => { // mocha hooks
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => {
    done()}
  );
});

describe('POST /todos', () => {

  it('Should create a new todo', (done) => {
    var text = 'Test data';
    request(app)
      .post('/todos')
      /* send in data as request so post can get text from the post
      request and create todo item and add it to the database */
      .send({text: text})
      .expect(200)
      .expect((res) => { // customed expect assertion
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => {
          done(e)
        });
      });
    });

    it('Should not create todo with invalid body data', (done) => {

      request(app)
        .post('/todos')
        .send({text: ""})
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          Todo.find().then((todos) => {
            expect(todos.length).toBe(2);
            done();
          }).catch((e) => {
            done(e);
          });
        });
    });
    
  describe('GET /todos', () => {
    it('Should get all todos', (done) => {
      request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
          expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    })
  })
});
