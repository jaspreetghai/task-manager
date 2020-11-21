// This will handle connection to MongoDB.

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mmongodb+srv://admin:admin@cluster0.0iiig.mongodb.net/TaskManager?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
    console.log("Connected to mongoDB");
}).catch((e) => {
    console.log("Error connecting to MongoDb::", e);
});

module.exports = {
    mongoose
}