const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server.js');
const {Todo} = require('./../models/todo.js');



beforeEach((done) => { // mocha hooks
  Todo.remove({}).then(() => {
    done()
  });
});

describe('POST /todos', () => {

  it('Should create a new todo', (done) => {
    var text = 'Test data';
    request(app)
      .post('/todos')
      .send({text: text})
      .expect(200)
      .expect((res) => { // customed expect assertion
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
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
            expect(todos.length).toBe(0);
            done();
          }).catch((e) => {
            done(e);
          });
        });
    });

});
