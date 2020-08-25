const {ObjectID} = require('mongodb');

const {Todo} = require('./../server/model/todo');

var id = '6f43a0dab9776f94f45b9edd';
if (!ObjectID.isValid(id)) {
    return console.log('ID not valid');
};

Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('Id not found');
    }
    console.log('Todo by ID', todo);
}).catch((e) => console.log(e));


