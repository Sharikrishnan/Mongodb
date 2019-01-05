const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);
MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err, client) => {
    if (err)
    return console.log("Unable to connect to MongoDB server");
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');
    // db.collection('Todos').insertOne({text:'just like that',completed:false},(err,result)=>{
    //     if (err) return console.log("Couldn't insert",err);
    //     console.log('Successfully added',JSON.stringify(result.ops,undefined,2));
    // });
    // db.collection('User').insertOne({name:'Hari123',age:23,location:'Chennai'},(err,result)=>{
    //     if (err) return console.log("Couldn't insert",err);
    //         console.log('Successfully added',JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2)); 
    // });
    db.collection('Todos').find().toArray().then((docs)=>{
        console.log('Todos',JSON.stringify(docs,undefined,2));
    },(err) => {
        console.log('Unable to fetch todos',err);
    });

    client.close();
});