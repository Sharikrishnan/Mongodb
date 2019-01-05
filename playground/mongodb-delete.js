const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err, client) => {
    if (err)
    return console.log("Unable to connect to MongoDB server");
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').deleteMany({text :"Testing 1"}).then((result) => {
    //     console.log(result);
    // });
    db.collection('User').deleteMany({name :"Hari1"}).then((result) => {
        console.log(result);
    });
    // db.collection('Todos').deleteOne({text :"Testing 4"}).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Todos').findOneAndDelete({text :"Testing 4"}).then((result) => {
    //     console.log(result);
    // });

    db.collection('User').findOneAndDelete({name :"Hari123"}).then((result) => {
        console.log(result);
    });
    client.close();
});