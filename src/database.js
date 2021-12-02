const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/notes-db-app', {
    //useCreateIndex: true,
    useNewUrlParser: true,
    //useFindAndmodify: false
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));