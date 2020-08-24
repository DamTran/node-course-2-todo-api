const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connet to MongoDb server');
    }
    console.log('Connected to mongoDB server');

    //deleteMany
    db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
        console.log(result);
    });


    //deleteOne

    // findOneAndDelete

    
    //db.close();
});
