const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connet to MongoDb server');
    }
    console.log('Connected to mongoDB server');

    db.collection('Todos').findOneAndUpdate(
        {
            _id: new ObjectID("5f432a95ea6597c8521c72b7")
        }, {
            $set: {
                complete: false
            }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log(result);
        })
    
    //db.close();
});
