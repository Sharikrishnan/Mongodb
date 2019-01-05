const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err, client) => {
    if (err)
    return console.log("Unable to connect to MongoDB server");
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({
    //     _id : new ObjectID('5c03b9ce051d1319ce12cb81')
    // },{
    //     $set : {
    //         completed: false
    //     }
    // }, {
    //     returnOriginal :false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('User').findOneAndUpdate({
        name:"Hari"
    },{
        $set : {
            location: "Bangalore"
        },
        $inc : {age: 1}
    }, {
        returnOriginal :false
    }).then((result) => {
        console.log(result);
    });
    client.close();
});