const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const {ObjectID} = require('mongodb')
const bcrypt = require('bcryptjs')

var password = '123456';

bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
                console.log(hash)
        })
})

var hashedPassword = '$2a$10$2TaUy/PBMFNRqtfkHZrB/.X0LFrgtYWTImOg79SgrthTKjbcv19vS'

bcrypt.compare(password, hashedPassword, (err, res) => {
        console.log(res)
})


// var data = {
//              id: 4
//         };
// console.log(data.toObject())
// var token = jwt.sign(data, 'secretkey');
// //console.log(token);

// var object = new ObjectID('5f44f037d7c4bbdcb8c4a5b7')
// console.log(object.toString())

// var decoded = jwt.verify(token, 'secretkey');
//console.log(decoded);
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
// console.log('message: ', message);
// console.log('Hash: ', hash);

// Create a token
// var data = {
//     id: 4
// };

// var token = {
//     data: data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// verify token
// var resultHash = SHA256(JSON.stringify(data) + 'somesecret').toString();
// if (resultHash === token.hash) {
//     console.log('data was not changed')
// } else {
//     console.log('data was changed. huhu')
// }


