var express = require('express');
var bodyParser =require('body-parser');

var {mongoose} = require('./db/mongoose')
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
        res.status(400).send(e)
    })
});

app.listen(3000,() => {
    console.log("Started on port 3000");
})




















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
