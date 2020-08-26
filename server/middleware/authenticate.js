const {User} = require('./../model/user')

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    console.log(token);
    User.findByToken(token).then((user) => {
        console.log(user)
        if (!user) {
            res.status(401).send();
        }
        //res.send(user)
        req.user = user
        req.token = token
        next()
    }).catch((e) => {
        res.status(401).send(e);
    })
}

module.exports = {
    authenticate
}