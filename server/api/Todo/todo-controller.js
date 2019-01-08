const _ = require('lodash');
const { ObjectID } = require('mongodb');
const HttpStatus = require('http-status-codes');

const { mongoose } = require('./../../db/mongoose');
const { Todo } = require('./../../models/todo');


module.exports.getAllTodos = async (req, res) => {
    Todo.find().then(todos => res.send({ todos }), e => res.status(HttpStatus.BAD_REQUEST).send(e));
};

module.exports.getTodo = async (req, res) => {
    const { id } = req.params;
    if (!ObjectID.isValid(id)) {
        return res.status(HttpStatus.NOT_FOUND).send('Not valid one');
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(HttpStatus.NOT_FOUND).send('File not Found');
        }
        return res.send({ todo });
    }, e => res.status(HttpStatus.BAD_REQUEST).send(e));
};

module.exports.addTodo = async (req, res) => {
    const todo = new Todo({
        text: req.body.text,
    });

    todo.save().then(docs => res.send(docs), e => res.status(HttpStatus.BAD_REQUEST).send(e));
};

module.exports.deleteTodo = async (req, res) => {
    const { id } = req.params;
    if (!ObjectID.isValid(id)) {
        return res.status(HttpStatus.NOT_FOUND).send('Not valid one');
    }
    Todo.findByIdAndDelete(id).then((todo) => {
        if (!todo) {
            return res.status(HttpStatus.NOT_FOUND).send('File not Found');
        }
        res.send({ todo });
    }, (e) => {
        res.status(HttpStatus.BAD_REQUEST).send(e);
    });
};

module.exports.patchTodo = async (req, res) => {
    const { id } = req.params;
    const body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(HttpStatus.NOT_FOUND).send('Not valid one');
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({ _id: id }, {
        $set: body,
    }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(HttpStatus.NOT_FOUND).send();
        }
        res.send({ todo });
    }).catch((e) => {
        res.status(HttpStatus.BAD_REQUEST).send(e);
    });
};
