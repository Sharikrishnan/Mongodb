const {ObjectID} = require('mongodb');
const {mongoose} = require('../server/db/mongoose')
const {Todo} = require('../server/models/todo')

var id = '5c3216564c2e7533780e41ed';

if (!ObjectID.isValid(id)) {
    console.log('Id is not valid');
}

// Todo.deleteOne({
//     completed: false
// }).then((result) =>{
//    console.log(result);
// });

// Todo.deleteMany({}).then((result) => {
//     console.log(result);
// });


Todo.findByIdAndDelete('5c324f26ac2e2c3fca1bf402').then((todo) => {
    console.log(todo)
})

// Todo.findById(id).then((todo) =>{
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log(todo);
// }).catch((e) => console.log(e));