const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client) => {
    if (err)
    return console.log("Unable to connect to MongoDB server");
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').find({completed : true}).toArray().then((docs)=>{
    //     console.log('Todos',JSON.stringify(docs,undefined,2));
    // },(err) => {
    //     console.log('Unable to fetch todos',err);
    // });

    // db.collection('Todos').find({_id: new ObjectID('5c03d74d84ff281a22e67df9')}).toArray().then((docs)=>{
    //     console.log('Todos',JSON.stringify(docs,undefined,2));
    // },(err) => {
    //     console.log('Unable to fetch todos',err);
    // });
    
    // db.collection('Todos').find().count().then((count)=>{
    //     console.log(`Todos count:- ${count}`);
    // },(err)=>{
    //     console.log(`Unable to fetch the count :- ${err}`);
    // });

    db.collection('User').find({name:'Hari1'}).toArray().then((count)=>{
        console.log(`Todos count:- ${JSON.stringify(count,undefined,4)}`);
    },(err)=>{
        console.log(`Unable to fetch the count :- ${err}`);
    });
    client.close();
});