var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//var test = 'mongodb+srv://admin:@Bc1234567890@cluster0.qzna1.mongodb.net/Todos?retryWrites=true&w=majority'

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//mongoose.set('useCreateIndex', true);
//mongoose.connect(test, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = {
    mongoose
};