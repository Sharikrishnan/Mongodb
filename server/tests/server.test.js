const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../server');
const {Todo} = require('../models/todo');

const todos = [{
    _id : new ObjectID(),
    text : "First Todo test"
},{
    _id : new ObjectID(),
    text : "Second Todo test",
    completed : true,
    completedAt: 333
}];

beforeEach((done) => {
    Todo.deleteMany({}).then(() =>{
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos',() => {
    it('should create a new todo',(done) => {
        var text = 'Test todo text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            
            Todo.find({text : "Test todo text"}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => {
                done(e);
            })
        })
    });

    it('Should not create todo with invalid body send',(done)=>{
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => {done(e)});
        })
    });
});

describe('GET /todos', () => {
    it('Should get all the Todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) =>{
            expect(res.body.todos.length).toBe(2);
        }).end(done);
    });
});

describe('GET /todos/:id',() => {
    it('Should get todo based on id passed as parameter', (done)=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        }).end(done);
    });

    it('Should return 404 if the id is invald',(done) => {
        request(app)
        .get('/todos/123')
        .expect(404)
        .expect((res) => {
            expect(res.text).toBe('Not valid one');
        }).end(done);
    });

    it('Should return 404 if record is not found',(done) => {
        request(app)
        .get(`/todos/${new ObjectID().toHexString()}`)
        .expect(404)
        .expect((res) => {
            expect(res.text).toBe('File not Found');
        }).end(done);
    });
});

describe('DELETE /todos/:id',() => {
    it('Should get todo based on id passed as parameter', (done)=>{
        var id = todos[0]._id.toHexString()
        request(app)
        .delete(`/todos/${id}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(id);
        }).end((err, res) => {
            if (err) {
                return done(err)
            }
            Todo.findById(id).then((todo) => {
                expect(todo).toBeFalsy();
                done();
            }).catch((e) => done(e));
        });
    });

    it('Should return 404 if the id is invald',(done) => {
        request(app)
        .delete('/todos/123')
        .expect(404)
        .expect((res) => {
            expect(res.text).toBe('Not valid one');
        }).end(done);
    });

    it('Should return 404 if record is not found',(done) => {
        request(app)
        .delete(`/todos/${new ObjectID().toHexString()}`)
        .expect(404)
        .expect((res) => {
            expect(res.text).toBe('File not Found');
        }).end(done);
    });
});

describe('PATCH /todos/:id',() => {

    it('Should return 404 if the id is invald',(done) => {
        request(app)
        .patch('/todos/123')
        .expect(404)
        .expect((res) => {
            expect(res.text).toBe('Not valid one');
        }).end(done);
    });

    it('Should return 404 if record is not found',(done) => {
        request(app)
        .patch(`/todos/${new ObjectID().toHexString()}`)
        .expect(404)
        .end(done);
    });

    it('Should update todo based on id passed as parameter', (done)=>{
        var id = todos[0]._id.toHexString();
        request(app)
        .patch(`/todos/${id}`)
        .send({
            text: "test using test",
            completed : true})
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(id);
            expect(res.body.todo.text).toBe("test using test");
            expect(res.body.todo.completed).toBe(true);
        }).end(done);
    });

    it('Should clear completedAt when todo is not completed', (done) => {
        var id = todos[1]._id.toHexString();
        request(app)
        .patch(`/todos/${id}`)
        .send({
            text: "False statement"
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(id);
            expect(res.body.todo.text).toBe("False statement");
            expect(res.body.todo.completed).toBe(false);
        }).end(done);
    });
});


