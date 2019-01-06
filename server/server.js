var express = require('express');
var bodyParser =require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    var todo = new Todo({
        text: req.body.text
    })

    todo.save().then((docs)=>{
        res.send(docs);
    },(e)=>{
        res.status(400).send(e);
    });
});

app.get('/todos',(req,res) => {
    Todo.find().then((todos)=>{
        res.send({todos});
    },(e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id',(req,res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send('Not valid one');
    }
    Todo.findById(id).then((todo)=>{
        if (!todo) {
            res.status(404).send('File not Found');
        }
        res.send({todo});
    },(e) => {
        res.status(400).send(e);
    });
});

app.listen(3000,() => {
    console.log("Started on port 3000");
})

module.exports = {app};















// var newTodo = new Todo({
//     text: 'Repair car'
// });

// var newTodo1 = new Todo({
//     text: 'wash car',
//     completed: false,
//     completedAt: 123
// });

// var newTodo1 = new Todo({text:' one '});
// newTodo1.save().then((result)=>{
// console.log("Saved doc",result);
// },(e)=>{
// console.log("Couldn't save",e);
// });



// var Example1 = new User.User({
//     email: 'sharikrishnan@athenahealth.com'
// });

// Example1.save().then((docs) => {
//     console.log("saved Doc -> ",docs);
// },(e)=>{
//     console.log("Couldn't save -> ",e)
// });
