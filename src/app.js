const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { response, request } = require('express');

const { authenticate } = require('./middlewares/authenticate')

const app = express();
const port = process.env.PORT || 3000;

// to parse body as json
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    //console.log(req.body)
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        });
    }, (e) => {
        res.status(400).send(e);
    }).catch((e) => console.log(e));
});

// GET
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
    // Get the id
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    // remove todo by Id
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(400).send("can not find the ID");
        };
        return res.send({ todo });
    }).catch((e) => res.status(400).send(e));
});

app.patch('/todos/:id', (req, res) => {
    // Get the id
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed'])
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    // remove todo by Id
    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(400).send("can not find the ID");
        };
        return res.send({ todo });
    }).catch((e) => res.status(400).send(e));
});

// POST User
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password'])
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
        //res.send(doc);
    }).then((token) => {
        console.log(token)
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        console.log('Eror', e);
        res.status(400).send(e)
    });
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user)
})

// POST/users/login(email,password)
app.post('/users/login', async (req, res) => {
    try {
        var body = _.pick(req.body, ['email', 'password'])
        var user = await User.findByCredentials(body.email, body.password)
        var token = await user.generateAuthToken();
        // gnerateToken 
        res.header('x-auth', token).send(user);
    } catch (e) {
        res.status(401).send(e)
    }
})

// async await method
app.delete('/users/me/token', authenticate, async (req, res) => {
    try {
        await req.user.removeToken(req.token)
        res.status(200).send()
    } catch (e) {
        res.status(400).send(e)
    }
})

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };
